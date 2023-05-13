import React, { useEffect, useState } from "react";

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

import { IGroupMember } from "../../@types/group";

import type { ColumnsType, TableProps } from "antd/es/table";
import axios from "axios";
// import { Pie } from "@ant-design/charts";
dayjs.extend(relativeTime);

const RankingTable = ({ users }: { users: IGroupMember[] }) => {
  const [usersData, setUsersData] = useState<IGroupMember[]>([]);
  const [updatingUser, setUpdatingUser] = useState("");

  const updatedUserHandler = async (username) => {
    if (updatingUser != "") return;
    setUpdatingUser(username);
    try {
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

  const columns: ColumnsType<IGroupMember> = [
    {
      title: "Name",
      dataIndex: "name",
      onFilter: (value: string, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, r) => (
        <Tooltip title={"aka " + r.name}>
          <Space>

          {r.leetcodeStats?.avatar ? (
            <Avatar  src={r.leetcodeStats?.avatar} />
          ) : (
            <Avatar >{r.name[0].toUpperCase()}</Avatar>
          )}
          <Divider type="vertical"  />

          <Link
            href={`https://leetcode.com/${r.leetcodeUsername}`}
            target="_blank"
            rel="noreferrer"
            >
            {r.leetcodeUsername}
          </Link>
            </Space>
        </Tooltip>
      ),
      width: "20%",

      // sortDirections: ["ascend", "descend"],
    },
    {
      title: "Ranking",
      dataIndex: "name",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.leetcodeStats?.ranking - b.leetcodeStats?.ranking,
      render: (v, r) =>
        r.leetcodeStats ? r.leetcodeStats?.ranking : <QuestionOutlined />,

      align: "center",
      width: "15%",
    },
    {
      title: "Total Solved",
      dataIndex: "totalSolved",
      sorter: (a, b) =>
        a.leetcodeStats ? getTotalSolved(a) - getTotalSolved(b) : null,
      render: (_, r) =>
        r.leetcodeStats ? getTotalSolved(r) : <QuestionOutlined />,
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
      width: "10%",
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      sorter: (a, b) =>
        dayjs(a.lastUpdated).toDate().getTime() -
        dayjs(b.lastUpdated).toDate().getTime(),
      render: (_, r) => dayjs().to(dayjs(r.lastUpdated)),
      width: "15%",
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
      width: "5%",
    },
  ];

  useEffect(() => {
    setUsersData(users);
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={usersData.map(u=>({...u, key:u.id}))}
      pagination={{
        pageSize: 50,
      }}
    />
  );
};

const getTotalSolved = (leetcodeUser: IGroupMember) => {
  if (leetcodeUser.leetcodeStats == null) return null;
  const { easySolved, mediumSolved, hardSolved } = leetcodeUser.leetcodeStats;
  return easySolved + mediumSolved + hardSolved;
};

export default RankingTable;
