import { theme } from "antd";
import Link from "next/link";
import React from "react";

const SiteHeader = () => {
  const { token } = theme.useToken();
  return (
    <header>
        <h1>
      <Link href={"/"}>
          <span style={{ color: token.colorPrimary }}>Leet</span>
          <span style={{ color: token.colorWhite }}>coder</span>
          <span style={{ color: token.colorPrimary }}>!</span>
      </Link>
        </h1>
    </header>
  );
};

export default SiteHeader;
