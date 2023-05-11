// import useSWR from "swr";
import { useState } from "react";
import Link from "next/link";
import CreateGroup from "../components/CreateGroup";
import { Card, Col, Divider, Row, Typography, theme } from "antd";
import JoinGroup from "../components/JoinGroup";
export default function Index() {
  const { token } = theme.useToken();
  return (
    <div>
      <div style={{margin:"2em"}}>
        <Typography style={{ fontSize: "6em" }}>
          <span style={{ color: token.colorPrimary }}>Leet</span>
          <span >
          <span style={{ color: token.colorWhite }}>coder</span>
          {/* <span style={{ color: token.colorPrimary }}>!</span> */}

          </span>
        
        </Typography>
        <Typography.Paragraph style={{fontSize:"1rem"}}>
          <ul style={{marginLeft:"2rem"}}>
            <li>Create and join groups of LeetCode users</li>
            <li>
              Compare your LeetCode ranking against other users in your group
            </li>
            <li>Track your progress over time</li>
            <li>
              See how you rank compared to users with similar experience and
              expertise
            </li>
          </ul>
        </Typography.Paragraph>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 4,
        }}
      >
        <Card title="Create A Group" style={{ margin: "1em" }}>
          <CreateGroup />
        </Card>

        <Card title="Join Existing Group" style={{ margin: "1em" }}>
          <JoinGroup />
        </Card>
      </div>
    </div>
  );
}
