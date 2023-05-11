// import useSWR from "swr";
import { useState } from "react";
import Link from "next/link";
import CreateGroup from "../components/CreateGroup";
import { Card, Col, Divider, Row, Typography, theme, Input } from "antd";
import JoinGroup from "../components/JoinGroup";
import IGroup from "../@types/group";
import GroupList from "../components/GroupList";
import axios from "axios";

const { Search } = Input;

export default function Index() {
  const { token } = theme.useToken();
  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState<IGroup[]>([])
  const [searchLoading, setSearchLoading] = useState(false);

  const searchResultHandler = async () => {
    if(searchLoading) return;

    setSearchLoading(true)
    try {
      const res = await axios.get(`/api/groups/search?name=${searchString}`)
      setSearchResult(res.data)
    } catch (error) {
      console.log(error)
    }
    setSearchLoading(false)

    
    
  }
  return (
    <div>
      <div style={{ margin: "2em" }}>
        <Typography style={{ fontSize: "6em" }}>
          <span style={{ color: token.colorPrimary }}>Leet</span>
          <span>
            <span style={{ color: token.colorWhite }}>coder</span>
            {/* <span style={{ color: token.colorPrimary }}>!</span> */}
          </span>
        </Typography>
        <Typography.Paragraph style={{ fontSize: "1rem" }}>
          <ul style={{ marginLeft: "2rem" }}>
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
      <Divider />

      <Card title="Search" style={{ margin: "1em" }}>
        <Search
          placeholder="group name"
          enterButton="Search"
          size="large"
          onSearch={searchResultHandler}
          loading={searchLoading}
          disabled={searchLoading}
          onChange={(e)=>setSearchString(e.target.value)}
        />

        <GroupList groupList={searchResult} />
      </Card>
    </div>
  );
}
