import SiteHeader from "../common/SiteHeader";
import React, { useEffect, useState } from "react";
import { Layout, message, theme, Spin } from "antd";
import Router from "next/router";
import SITE_CONFIG from "../../site_config";
import Link from "next/link";
import { BarLoader } from "react-spinners";
const { Header, Footer, Sider, Content } = Layout;

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
      message.error("Error loading page!");
      setIsLoading(false);
    });
  }, [Router]);
  return (
    <div style={{ display: "flex", flexFlow: "column", minHeight: "100vh" }}>
      <Header style={{ backgroundColor: token.colorBgLayout }}>
        <SiteHeader />
      </Header>
      <BarLoader  loading={isLoading} style={{backgroundColor:"transparent", width:"100vw"}} color={token.colorPrimary} />

      <Content style={{ backgroundColor: token.colorBgBase, padding: "0 1em" }}>
        {props.children}
      </Content>
      <Footer style={{ textAlign: "center", marginTop: "auto" }}>
        <Link href={SITE_CONFIG.repoURL} target="_blank" rel="noreferrer">
          Source Code
        </Link>
      </Footer>
    </div>
  );
};

export default SiteLayout;
