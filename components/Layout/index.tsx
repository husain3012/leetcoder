import SiteHeader from "../common/SiteHeader";
import React from "react";
import { Layout, theme } from "antd";
import SITE_CONFIG from "../../site_config";
import Link from "next/link";

const { Header, Footer, Sider, Content } = Layout;

const SiteLayout = (props) => {
  const { token } = theme.useToken();
  return (
    <div style={{ display: "flex", flexFlow: "column", minHeight: "100vh" }}>
      <Header  style={{ backgroundColor: token.colorBgLayout }}>
        <SiteHeader />
      </Header>

      <Content style={{ backgroundColor: token.colorBgBase }}>
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
