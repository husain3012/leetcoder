import SiteHeader from "../common/SiteHeader";
import React, { useEffect, useMemo, useState } from "react";
import { Layout, message, theme, Spin, notification } from "antd";
import Router from "next/router";
import SITE_CONFIG from "../../site_config";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import {
  GithubOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
const { Header, Footer, Content } = Layout;

import { NotificationCtx } from "../../context/notification";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const NotificationPriorityDuration = {
  LOW: 3,
  MEDIUM: 6.5,
  HIGH: 10,
  VERY_HIGH: 0,
};
const SiteLayout = (props) => {
  const contextValue = useMemo(() => ({ from: "Husain Shahid" }), []);
  const [api, contextHolder] = notification.useNotification();

  const { token } = theme.useToken();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", (e) => {
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", () => {
      console.log("Error loading page!");
      setIsLoading(false);
    });
  }, [Router]);

  useEffect(() => {
    const localStorageHistory = localStorage.getItem("notificationHistory");
    let notificationHistory =
      localStorageHistory == undefined ? {} : JSON.parse(localStorageHistory);
      // delete old history
      const {notificationHistoryAge} = SITE_CONFIG
    Object.keys(notificationHistory).forEach((notification) => {
      if (dayjs(notificationHistory[notification].date).isBefore(dayjs().subtract(notificationHistoryAge.amount, notificationHistoryAge.unit))) {
    
        delete notificationHistory[notification]
      }
    });
    const renderAnnouncements = async () => {
      const fetchedAnnouncements = await axios.get("/api/others/announcements");
     

      if (!fetchedAnnouncements.data.error) {
        Promise.all(
          fetchedAnnouncements.data.data.map((announcement) => {
            if (!notificationHistory[announcement.id]) {
              notificationHistory[announcement.id] = {
                count: 0,
                date: announcement.createdOn,
              };
            }
            if (notificationHistory[announcement.id].count > 3) {
              return new Promise((resolve) => resolve);
            }
            api.open({
              message: announcement.title,
              description: `[${dayjs().to(announcement.createdOn)}] ${
                announcement.content
              }`,
              duration: NotificationPriorityDuration[announcement.priority],
              type: announcement.type.toLowerCase(),
            });

            notificationHistory[announcement.id].count += 1;

            localStorage.setItem(
              "notificationHistory",
              JSON.stringify(notificationHistory)
            );

            new Promise((resolve, reject) => {
              setTimeout(resolve, 2000, "foo");
            });
          })
        );
      }
    };
    renderAnnouncements();
    
    localStorage.setItem(
      "notificationHistory",
      JSON.stringify(notificationHistory)
    );

  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <BarLoader
        loading={isLoading}
        width={"100%"}
        cssOverride={{
          display: "block",
          position: "fixed",
          margin: "0 auto",
          borderColor: "red",
          backgroundColor: token.colorBgLayout,
          top: 0,
          zIndex: 100,
          width: "100%",
          overflowX: "hidden",
        }}
        speedMultiplier={1.5}
        color={token.colorPrimary}
      />

      <NotificationCtx.Provider value={contextValue}>
        {contextHolder}
        <Header style={{ backgroundColor: token.colorBgLayout }}>
          <SiteHeader />
        </Header>

        <Content
          style={{ backgroundColor: token.colorBgBase, padding: "0 1em" }}
        >
          {props.children}
        </Content>
        <Footer style={{ textAlign: "center", marginTop: "auto" }}>
          <Link href={SITE_CONFIG.repoURL} target="_blank" rel="noreferrer">
            Contribute on <GithubOutlined />
          </Link>
        </Footer>
      </NotificationCtx.Provider>
    </div>
  );
};

export default SiteLayout;
