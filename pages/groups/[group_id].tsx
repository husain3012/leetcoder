import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import React from "react";
import { getGroupStatus } from "../../services/groups/status";
import IGroup from "../../@types/group";
import RankingTable from "../../components/Tables/RankingTable";
import { Card, Divider, Typography, Avatar } from "antd";
import SITE_CONFIG from "../../site_config";

const { Meta } = Card;

const Group = ({ groupStats }: { groupStats: IGroup }) => {
  return (
    <div>
      <Card
        style={{ margin: "2em" }}
        cover={<img alt="Cover Photo" src={groupStats.coverPhoto} style={{
            maxHeight:300,
            objectFit:"cover",
        }} />}
      >
        <Meta
          avatar={<Avatar src={SITE_CONFIG.leetcode_logo} />}
          title={groupStats.name}
          description={groupStats.description}
        />
      </Card>

      <div
        style={{
          margin: "2em",
          maxWidth: "100vw",
          overflowX:"auto"
        }}
      >
        <RankingTable users={groupStats.members} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query);
  const group_id = Number(context.query.group_id);
  const groupStats = await getGroupStatus(group_id);

  const serializedData = {
    ...groupStats,
    members: groupStats.members.map((m) => ({
      ...m,
      lastUpdated: m.lastUpdated.toISOString(),
      lastAccessed: m.lastAccessed.toISOString(),
    })),
  };

  return {
    props: {
      groupStats: serializedData,
    },
  };
};

export default Group;
