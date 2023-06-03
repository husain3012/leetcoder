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
// import { Pie } from "@ant-design/charts";
dayjs.extend(relativeTime);

const RankingTable = ({ users, loggedUser }: { users: IGroupMember[], loggedUser:IGroupMember }) => {
  const [usersData, setUsersData] = useState<IGroupMember[]>([]);
  const [updatingUser, setUpdatingUser] = useState("");

  const isMobile = useMediaQuery({ query: '(max-width: 956px)' })

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

  const currentUserStyles : CSSProperties = {
    fontWeight: 'bolder',
  }

  const columns: ColumnsType<IGroupMember> = [
    {
      title: "Name",
      dataIndex: "name",
      onFilter: (value: string, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      render: (_, r) => (
        <Tooltip title={r.leetcodeUsername===loggedUser?.leetcodeUsername?"You":"aka " + r.name}>
          <Space style={r.leetcodeUsername===loggedUser?.leetcodeUsername?currentUserStyles:{}} >

        

          {
            !isMobile && <>
              {r.leetcodeStats?.avatar ? (
            <Avatar  src={r.leetcodeStats?.avatar} />
          ) : (
            <Avatar >{r.name[0].toUpperCase()}</Avatar>
          )}
          <Divider type="vertical"  /></>
          }

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
      title: "Contest Attended",
      dataIndex: "contestAttended",
      defaultSortOrder: "ascend",
      sorter: (a, b) =>  a.leetcodeStats?.contestAttended - b.leetcodeStats?.contestAttended ,
      render: (v, r) =>
        r.leetcodeStats ? r.leetcodeStats?.contestAttended : <QuestionOutlined />,

      align: "center",
      width: "10%",
      
    },

    {
      title: "Contest Rating",
      dataIndex: "contestRating",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.leetcodeStats?.contestRating==0?1:b.leetcodeStats?.contestRating==0?-1: a.leetcodeStats?.contestRating - b.leetcodeStats?.contestRating ,
      render: (v, r) =>
        r.leetcodeStats?.contestRating ? r.leetcodeStats?.contestRating : <QuestionOutlined />,

      align: "center",
      width: "14%",
      responsive: ["sm"]

    },
  
    
    {
      title: "Contest Ranking",
      dataIndex: "contestRanking",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.leetcodeStats?.contestRanking==0?1:b.leetcodeStats?.contestRanking==0?-1: a.leetcodeStats?.contestRanking - b.leetcodeStats?.contestRanking ,
      render: (v, r) =>
        r.leetcodeStats?.contestRanking ? r.leetcodeStats?.contestRanking : <QuestionOutlined />,

      align: "center",
      width: "14%",
    },
  
    {
      title: "Question Solved",
      // dataIndex: "totalSolved",z
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
      width: "18%",
      responsive: ["sm"]
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      sorter: (a, b) =>
        dayjs(a.lastUpdated).toDate().getTime() -
        dayjs(b.lastUpdated).toDate().getTime(),
      render: (_, r) => dayjs().to(dayjs(r.lastUpdated)),
      width: "16&",
      responsive: ["sm"]

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
      responsive: ["sm"]

    },
  ];

  useEffect(() => {
    setUsersData(users);
  }, []);

  return (
    <Table
    size={isMobile?"small":"middle"}
      // rowClassName={(r, i)=>r.leetcodeUsername===loggedUser?"rankingTable-selected":""}
      rowKey={(r,i)=>r.id}
      columns={columns}
      dataSource={usersData}
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
