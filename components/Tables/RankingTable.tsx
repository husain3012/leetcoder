import React, { CSSProperties, useEffect, useState } from "react";

import {
  Avatar,
  Button,
  Divider,
  Skeleton,
  Space,
  Table,
  Tooltip,
  message,
  theme,
} from "antd";
import { ReloadOutlined, QuestionOutlined } from "@ant-design/icons";
import Link from "next/link";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useMediaQuery } from "react-responsive";

import { IGroupMember } from "../../@types/group";

import type { ColumnsType, TableProps } from "antd/es/table";
import axios from "axios";
import { warmup_prisma } from "../../utils";

import TruncatedText from "../common/TruncatedText";

import dynamic from "next/dynamic";
import stringToHslColor from "../../utils/strint_to_color";
const Pie = dynamic(() => import("@ant-design/charts").then(({ Pie }) => Pie), {
  ssr: false,
});
// import { Pie } from "@ant-design/charts";
dayjs.extend(relativeTime);

const RankingTable = ({
  users,
  loggedUser,
}: {
  users: IGroupMember[];
  loggedUser: IGroupMember;
}) => {
  const [usersData, setUsersData] = useState<IGroupMember[]>([]);
  const [updatingUser, setUpdatingUser] = useState("");

  const isMobile = useMediaQuery({ query: "(max-width: 956px)" });

  const updatedUserHandler = async (username) => {
    if (updatingUser != "") return;
    setUpdatingUser(username);
    try {
      await warmup_prisma();
      const updatedUser = (
        await axios.post(`/api/update/user?username=${username}`)
      ).data as IGroupMember;
      setUsersData((uData) =>
        uData.map((u) => (u.id == updatedUser.id ? updatedUser : u))
      );
    } catch (error) {
      message.error(error.message);
    }
    setUpdatingUser("");
  };

  const currentUserStyles: CSSProperties = {
    fontWeight: "bolder",
  };

  const columns: ColumnsType<IGroupMember> = [
    {
      title: "Name",
      dataIndex: "name",
      onFilter: (value: string, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, r) => (
        <Tooltip
          title={
            r.leetcodeUsername === loggedUser?.leetcodeUsername
              ? "You"
              : "aka " + r.name
          }
        >
          <Space
            style={
              r.leetcodeUsername === loggedUser?.leetcodeUsername
                ? currentUserStyles
                : {}
            }
          >
            <Link
              href={`https://leetcode.com/${r.leetcodeUsername}`}
              target="_blank"
              rel="noreferrer"
              style={{ margin: "auto" }}
            >
              {!isMobile && (
                <>
                  {r.leetcodeStats.avatar && r.leetcodeStats.avatar!=="https://s3-us-west-1.amazonaws.com/s3-lc-upload/assets/default_avatar.jpg" ? (
                    <Avatar src={r.leetcodeStats?.avatar} />
                  ) : (
                    <Avatar style={{backgroundColor:stringToHslColor(r.leetcodeUsername)}} >{r.name[0].toUpperCase()}</Avatar>
                  )}

                  <Divider type="vertical" />
                </>
              )}

              <TruncatedText
                isMobile={isMobile}
                str={r.leetcodeUsername}
                n={10}
              />
            </Link>
          </Space>
        </Tooltip>
      ),
      width: isMobile ? "10%" : "20%",
    },
    {
      title: "Contest Attended",
      dataIndex: "contestAttended",
      sorter: (a, b) =>
        a.leetcodeStats?.contestAttended - b.leetcodeStats?.contestAttended,

      render: (v, r) =>
        r.leetcodeStats ? (
          r.leetcodeStats?.contestAttended
        ) : (
          <QuestionOutlined />
        ),

      align: "center",
      width: "10%",
    },

    {
      title: "Contest Rating",
      dataIndex: "contestRating",

      sorter: (a, b) =>
        a.leetcodeStats?.contestRating == 0
          ? 1
          : b.leetcodeStats?.contestRating == 0
          ? -1
          : a.leetcodeStats?.contestRating - b.leetcodeStats?.contestRating,
      render: (v, r) =>
        r.leetcodeStats?.contestRating ? (
          r.leetcodeStats?.contestRating
        ) : (
          <QuestionOutlined />
        ),

      align: "center",
      width: "14%",
      responsive: ["sm"],
    },

    {
      title: "Contest Ranking",
      dataIndex: "contestRanking",
      defaultSortOrder: "ascend",
      sorter: (a, b) =>
        a.leetcodeStats?.contestRanking == 0
          ? 1
          : b.leetcodeStats?.contestRanking == 0
          ? -1
          : a.leetcodeStats?.contestRanking - b.leetcodeStats?.contestRanking,
      render: (v, r) =>
        r.leetcodeStats?.contestRanking ? (
          r.leetcodeStats?.contestRanking
        ) : (
          <QuestionOutlined />
        ),

      align: "center",
      width: "14%",
    },

    {
      title: "Question Solved",
      // dataIndex: "totalSolved",z
      sorter: (a, b) =>
        a.leetcodeStats ? getTotalSolved(a) - getTotalSolved(b) : null,
      render: (_, r) =>
        getTotalSolved(r) ? (
          <Tooltip
            title={`${r.leetcodeStats.easySolved}E, ${r.leetcodeStats.mediumSolved}M, ${r.leetcodeStats.hardSolved}H`}
          >
            <Space>
              {isMobile ? (
                getTotalSolved(r)
              ) : (
                <QuestionSolvedPie leetcodeUser={r} />
              )}
            </Space>
          </Tooltip>
        ) : (
          <QuestionOutlined />
        ),
      align: "center",
      width: "10%",
    },
    {
      title: "Max Streak",
      dataIndex: "maxStreak",
      sorter: (a, b) => a.leetcodeStats?.streak - b.leetcodeStats?.streak,
      render: (_, r) =>
        r.leetcodeStats ? r.leetcodeStats?.streak : <QuestionOutlined />,
      align: "center",
      width: "12%",
      responsive: ["sm"],
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      sorter: (a, b) =>
        dayjs(a.lastUpdated).toDate().getTime() -
        dayjs(b.lastUpdated).toDate().getTime(),
      render: (_, r) => dayjs().to(dayjs(r.lastUpdated)),
      width: "15%",
      responsive: ["sm"],
    },
    {
      title: "Update",
      align: "center",
      render: (a, b) => (
        <Button
          loading={b.leetcodeUsername == updatingUser}
          disabled={b.leetcodeUsername == updatingUser}
          type="ghost"
          icon={<ReloadOutlined />}
          onClick={() => updatedUserHandler(b.leetcodeUsername)}
        />
      ),
      width: "10%",
      responsive: ["sm"],
    },
  ];

  useEffect(() => {
    setUsersData(users);
  }, []);

  return (
    <Table
      size={isMobile ? "small" : "middle"}
      // rowClassName={(r, i)=>r.leetcodeUsername===loggedUser?"rankingTable-selected":""}
      rowKey={(r, i) => r.id}
      columns={columns}
      dataSource={usersData}
      pagination={{
        pageSize: 50,
      }}
    />
  );
};

const getTotalSolved = (leetcodeUser: IGroupMember) => {
  if (leetcodeUser.leetcodeStats == null) return 0;
  const { easySolved, mediumSolved, hardSolved } = leetcodeUser.leetcodeStats;
  return easySolved + mediumSolved + hardSolved;
};

const QuestionSolvedPie = ({
  leetcodeUser,
}: {
  leetcodeUser: IGroupMember;
}) => {
  const { token } = theme.useToken();

  const data = [
    {
      type: "Easy",
      value: leetcodeUser.leetcodeStats.easySolved,
      color: token.colorSuccess,
    },
    {
      type: "Medium",
      value: leetcodeUser.leetcodeStats.mediumSolved,
      color: token.colorWarning,
    },
    {
      type: "Hard",
      value: leetcodeUser.leetcodeStats.hardSolved,
      color: token.colorError,
    },
  ];
  return (
    <Pie
      data={data}
      angleField="value"
      colorField="type"
      color={[token.colorSuccess, token.colorWarning, token.colorError]}
      radius={1}
      innerRadius={0.85}
      height={50}
      width={100}
      pieStyle={{ lineWidth: 0 }}
      interactions={[]}
      legend={false}
      label={false}
      tooltip={false}
      statistic={{
        content: {
          style: {
            fontSize: "1em",
            color: token.colorWhite,
            fontWeight: "normal",
          },
        },
        title: false,
      }}
    />
  );
};

export default RankingTable;
