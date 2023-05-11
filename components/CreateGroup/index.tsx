import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Form,
  Input,
  Spin,
  message,
  theme,
} from "antd";
import Link from "next/link";
import axios from "axios";
import IGroup from "../../@types/group";
import { CopyFilled, EditOutlined, SettingOutlined } from "@ant-design/icons";
import SITE_CONFIG from "../../site_config";

const { Meta } = Card;

const CreateGroup = () => {
  const {token} = theme.useToken();
  const [groupCreated, setGroupCreated] = useState<IGroup | null>(null);
  const [creatingGroup, setCreatingGroup] = useState(false);

  const onFinish = async (values) => {
    setCreatingGroup(true);
    try {
      const createdGroup = await axios.post("/api/groups/create", {
        name: values.name,
        description: values.description,
        createdByEmail: values.createdByEmail,
        coverPhoto: values.coverPhoto,
      });

      message.success(`Group '${createdGroup.data.name}' created!`);
      setGroupCreated(createdGroup.data);
    } catch (error) {
      message.error(error.message);
    }
    setCreatingGroup(false);
  };
  return (
    <Spin spinning={creatingGroup}>
      {!groupCreated ? (
        <Form
          disabled={creatingGroup}
          name="basic"
          labelCol={{ span: 10 }}
          style={{width:350}}

          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Group Name"
            name="name"
            rules={[
              { required: true, message: "Please input a unique groupname!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Your Email"
            name="createdByEmail"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Cover Photo" name="coverPhoto">
            <Input placeholder="link for a custom cover photo" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Card
          style={{ width: 300 }}
          cover={<img alt="cover photo" src={groupCreated.coverPhoto} />}
          actions={[
            <CopyFilled
              onClick={async () => {
                await navigator.clipboard.writeText(groupCreated.inviteID);
                message.success(
                  `${groupCreated.inviteID} copied to clipboard!`
                );
              }}
              key="copy"
            />,
          ]}
        >
          <Meta
            avatar={
              <Avatar src={SITE_CONFIG.leetcode_logo} />
            }
            title={`${groupCreated.name}`}

            description={<div>
              <p>
              Invite id: <code style={{color:token.colorPrimary, fontWeight:"bold"}}>{groupCreated.inviteID}</code>
              </p>
              <p>
                Keep this invite id safe as you wont be able to generate it again.
              </p>
            </div>}
          />
        </Card>
      )}
    </Spin>
  );
};

export default CreateGroup;
