import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import React from "react";
import { getGroupStatus } from "../../services/groups/status";
import IGroup, { IGroupMember } from "../../@types/group";
import RankingTable from "../../components/Tables/RankingTable";
import { Card, Divider, Typography, Avatar, Tooltip } from "antd";
import SITE_CONFIG from "../../site_config";
import { SmileFilled, UserOutlined } from "@ant-design/icons";
import QuestionSolvedBar from "../../components/Charts/QuestionSolvedBar";
import { getUserInfo } from "../../services/users/userInfo";

const { Meta } = Card;

const Group = ({ groupStats, loggedUser }: { groupStats: IGroup , loggedUser:IGroupMember|null}) => {




  return (
    <div>
      <Card
        style={{ margin: "2em" }}
        cover={
          <img
            alt="Cover Photo"
            src={groupStats.coverPhoto}
            style={{
              maxHeight: 300,
              objectFit: "cover",
            }}
          />
        }
      >
        <Meta
          avatar={
            <Tooltip title={`Created by ${groupStats.createdByEmail}`}>
              <SmileFilled style={{ fontSize: "2rem" }} />
            </Tooltip>
          }
          title={groupStats.name}
          description={groupStats.description}
        />
      </Card>

  
      <div
        style={{
          margin: "2em",
          maxWidth: "100vw",
          overflowX: "auto",
        }}
      >
        <QuestionSolvedBar groupStats={groupStats} />
      </div>
      <div
        style={{
          margin: "2em",
          maxWidth: "100vw",
          overflowX: "auto",
        }}
      >
        <RankingTable users={groupStats.members} loggedUser={loggedUser} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const group_tag = context.query.tag as string;
  const groupStats = await getGroupStatus(group_tag);

 


  const serializedData = {
    ...groupStats,
    members: groupStats.members.map((m) => ({
      ...m,
      lastUpdated: m.lastUpdated.toISOString(),
      lastAccessed: m.lastAccessed.toISOString(),
    })),
  };

  const savedUser = context.req.cookies["leetcode-user"]

  if(!savedUser){
    return {
      props: {
        groupStats: serializedData,
      },
    };

  }

  const savedUserInfo = await getUserInfo(savedUser);
  const serializedUserData  = {
    ...savedUserInfo,
    lastAccessed: savedUserInfo.lastAccessed.toISOString(),
    lastUpdated: savedUserInfo.lastUpdated.toISOString(),
  }

  



  return {
    props: {
      groupStats: serializedData,
      loggedUser: serializedUserData
    },
  };


};

export default Group;