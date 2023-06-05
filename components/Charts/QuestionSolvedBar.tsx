import dynamic from "next/dynamic";

import IGroup from "../../@types/group";

const DualAxes = dynamic(
  () => import("@ant-design/charts").then(({ DualAxes }) => DualAxes),
  { ssr: false }
);

import React, { useEffect, useState } from "react";
import { Card, Spin, theme } from "antd";

const QuestionSolvedBar = ({ groupStats }: { groupStats: IGroup }) => {
  const [chartLoading, setChartLoading] = useState(true);
  const bar_graph_data = [];
  const line_graph_data = [];
  const { token } = theme.useToken();


  groupStats.members.forEach((member) => {
    bar_graph_data.push({
      user: member.leetcodeUsername,
      solved: member.leetcodeStats.hardSolved,
      type: "hard",
      color: "#FF375F",
    });

    bar_graph_data.push({
      user: member.leetcodeUsername,
      solved: member.leetcodeStats.mediumSolved,
      type: "medium",
      color: "#FFC01E",
    });
    bar_graph_data.push({
      user: member.leetcodeUsername,
      solved: member.leetcodeStats.easySolved,
      type: "easy",
      color: "#00B8A3",
    });
    line_graph_data.push({
      user: member.leetcodeUsername,
      contestRating: member.leetcodeStats.contestRating,

    })
  });
  return (
    <Card style={{ overflowX: "auto" }} title="Questions Solved Chart (Top 10)">
        <Spin spinning={chartLoading}>
        <DualAxes
          {...{
            onReady : ()=>setChartLoading(false),
            data: [bar_graph_data.slice(0,10), line_graph_data.slice(0,10)],
            geometryOptions: [
              {
                geometry: 'column',
                isStack: true,
                seriesField: 'type',
                color: ["#FF375F", "#FFC01E", "#00B8A3"],
              label: {
                  // 可手动配置 label 数据标签位置
                  position: "middle",
                  // 'top', 'bottom', 'middle'
                  // 可配置附加的布局方法
                  layout: [
                    // 柱形图数据标签位置自动调整
                    {
                      type: "interval-adjust-position",
                    }, // 数据标签防遮挡
                    {
                      type: "interval-hide-overlap",
                    }, // 数据标签文颜色自动调整
                    {
                      type: "adjust-color",
                    },
                  ],
                },

                
              },
              {
                geometry: 'line',
                smooth: true,
                color: token.colorPrimary,
                lineStyle: {
                  lineWidth: 2.5,
                },
              },
            ],
            xField: "user",
            yField: ["solved", "contestRating"],
            seriesField: "type",
            maxColumnWidth: 48,
            legend: false,
            key:"user",

           
          }}
        />
    </Spin>
      </Card>
  );
};

export default QuestionSolvedBar;
