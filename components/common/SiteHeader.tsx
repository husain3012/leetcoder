import { theme } from "antd";
import Link from "next/link";
import React from "react";

const SiteHeader = () => {
  const { token } = theme.useToken();
  return (
    <header>
      <Link href={"/"}>
        <h1>
          <span style={{ color: token.colorPrimary }}>Leet</span>
          <span style={{ color: token.colorWhite }}>coder</span>
          <span style={{ color: token.colorPrimary }}>!</span>
        </h1>
      </Link>
    </header>
  );
};

export default SiteHeader;
