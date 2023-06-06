import SiteHeader from "../common/SiteHeader";
import React, { useEffect, useState } from "react";
import { Layout, message, theme, Spin } from "antd";
import Router from "next/router";
import SITE_CONFIG from "../../site_config";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import { GithubOutlined } from "@ant-design/icons";
const { Header, Footer, Content } = Layout;

const SiteLayout = (props) => {
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
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        minHeight: "100vh",
        width: "100vw",
        overflowX:"hidden"
      }}
    >
     
        <BarLoader
          loading={isLoading}
          width={"100%"}
          cssOverride={{
            display: "block",
            position:"fixed",
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
  
      <Header style={{ backgroundColor: token.colorBgLayout }}>
        <SiteHeader />
      </Header>

      <Content style={{ backgroundColor: token.colorBgBase, padding: "0 1em" }}>
        {props.children}
      </Content>
      <Footer style={{ textAlign: "center", marginTop: "auto" }}>
        <Link href={SITE_CONFIG.repoURL} target="_blank" rel="noreferrer">
          Contribute on <GithubOutlined/>
        </Link>
      </Footer>
    </div>
  );
};

export default SiteLayout;
