import { Analytics } from "@vercel/analytics/react";
import SiteLayout from "../components/Layout";
import { ConfigProvider, theme } from "antd";
import { CookiesProvider } from "react-cookie";
import "../global.css";
import { initializeDB } from "../db";
const MyApp = ({ Component, pageProps }) => {
  if (typeof window === "undefined") {
    initializeDB();
  }
  return (
    <>
      <CookiesProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#FFA116",
              colorBgLayout: "#282828",
              colorLink: "#FFA116",
              colorLinkHover: "#488CF1",
              colorBgBase: "#1a1a1a",
              colorSuccess: "#00B8A3",
              colorWarning: "#FFC01E",
              colorError: "#FF375F",
            },

            algorithm: theme.darkAlgorithm,
          }}
        >
          <SiteLayout>
            <Component {...pageProps} />
          </SiteLayout>
        </ConfigProvider>
      </CookiesProvider>

      <Analytics />
    </>
  );
};
export default MyApp;
