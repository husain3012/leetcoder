import React from "react";

import { Button, Skeleton, Space, Table, Tooltip, theme } from "antd";
import { ReloadOutlined, QuestionOutlined } from "@ant-design/icons";
import Link from "next/link";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { IGroupMember } from "../../@types/group";

import type { ColumnsType, TableProps } from "antd/es/table";
// import { Pie } from "@ant-design/charts";
dayjs.extend(relativeTime);

const columns: ColumnsType<IGroupMember> = [
  {
    title: "Name",
    dataIndex: "name",
    onFilter: (value: string, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    render: (_, r) => (
      <Tooltip title={"@" + r.leetcodeUsername}>
        <Link
          href={`https://leetcode.com/${r.leetcodeUsername}`}
          target="_blank"
          rel="noreferrer"
        >
          {r.name}
        </Link>
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
    title: "Current Streak",
    dataIndex: "currentStreak",
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
    width:"15%"
  },
  // {
  //   title: "Update",
  //   align:"center",
  //   render: (a, b) => <Button type="ghost" icon={<ReloadOutlined />} />,
  //   width: "5%",
    
  // },
];

const RankingTable = ({ users }: { users: IGroupMember[] }) => {
  console.log(users);
  return <Table columns={columns} dataSource={users} pagination={
    {
      pageSize:50
    }
  } />;
};

const getTotalSolved = (leetcodeUser: IGroupMember) => {
  if (leetcodeUser.leetcodeStats == null) return null;
  const { easySolved, mediumSolved, hardSolved } = leetcodeUser.leetcodeStats;
  return easySolved + mediumSolved + hardSolved;
};



const UpdateButton = () =>{

}

// const TotalSolvedPieChart = (leetcodeUser: IGroupMember) =>{
//   const {token} = theme.useToken();
//   if (leetcodeUser.leetcodeStats == null) return null;
//   const {easySolved, mediumSolved, hardSolved} = leetcodeUser.leetcodeStats
//   const total = easySolved + mediumSolved + hardSolved;
//   const data = [
//     {
//       type: 'Easy',
//       value: easySolved/total*100,
//       color: token.colorSuccess
//     },
//     {
//       type: 'Medium',
//       value: mediumSolved/total*100,
//       color: token.colorWarning
//     },
//     {
//       type: 'Hard',
//       value: hardSolved/total*100,
//       color: token.colorError
//     },

//   ];

//   const config = {
//     appendPadding: 10,
//     data,
//     angleField: 'value',
//     colorField: 'color',
//     radius: 0.9,
//     label: {
//       type: 'inner',
//       offset: '-30%',
//       content: ({ percent }) => `${(percent * total/100).toFixed(0)}`,
//       style: {
//         fontSize: 14,
//         textAlign: 'center',
//       },
//     },
//     interactions: []
//   };
//   return <Pie {...config} />;


// }

export default RankingTable;
