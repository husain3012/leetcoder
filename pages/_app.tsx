import { Analytics } from "@vercel/analytics/react";
import SiteLayout from "../components/Layout";
import { ConfigProvider, theme } from "antd";

import "../global.css"

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
    <ConfigProvider

    theme={{
      token:{
        colorPrimary:"#FFA116",
        colorBgLayout:"#282828",
        colorLink:"#FFA116",
        colorLinkHover:"#488CF1",
        colorBgBase:"#1a1a1a",
        colorSuccess:"#00B8A3",
        colorWarning:"#FFC01E",
        colorError:"#FFC01E"
      },
    
      algorithm: theme.darkAlgorithm
    }}
    >

      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </ConfigProvider>
      <Analytics />
    </>
  );
};
export default MyApp;
