import { Avatar, List } from "antd";
import React from "react";
import IGroup from "../../@types/group";
import Link from "next/link";

const GroupList = ({ groupList }: { groupList: IGroup[] }) => {
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={groupList}
        renderItem={(item, index) => (
          <List.Item extra={<Link target="_blank" rel="noreferrer" href={`/groups/${item.id}`}>Show</Link>}>
            <List.Item.Meta
              avatar={<Avatar src={item.coverPhoto} />}
              title={item.name}
              description={item.description}
            />
               <List.Item.Meta
              
              title={`${item._count.members} members`}
          
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default GroupList;
