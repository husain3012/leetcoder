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
  Typography,
} from "antd";
import Link from "next/link";
import axios from "axios";
import IGroup from "../../@types/group";
import { CopyFilled } from "@ant-design/icons";
import SITE_CONFIG from "../../site_config";

const { Text } = Typography;

const { Meta } = Card;

const CreateGroup = () => {
  const { token } = theme.useToken();
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
        urlSlug : values.urlSlug
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
          // style={{ width: 256 }}
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
            label="URL Slug"
            name="urlSlug"
            rules={[
              { required: true, message: "Please input a tag (url slug)!" },
            ]}
          >
            <Input addonBefore="/groups/" placeholder="leetcoders-69" />
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

          <Form.Item style={{ textAlign: "center" }}>
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
                await navigator.clipboard.writeText(`${window.origin}?invite_id=${groupCreated.inviteID}`);
                message.success(
                  `Invite link copied to clipboard!`
                );
              }}
              key="copy"
            />
          ]}
        >
          <Meta
            avatar={<Avatar src={SITE_CONFIG.leetcode_logo} />}
            title={`${groupCreated.name}`}
            description={
              <div>
                <Link
                  href={`/groups/${groupCreated.urlSlug}`}
                  target="_blank"
                  rel="noreferrer"
                >Group Link</Link>
                <p>
                  Invite Link:{" "}
                  <Text code
                    style={{ color: token.colorPrimary}}
                  >
                    {groupCreated.inviteID}
                  </Text>
                </p>
                
                <p>
                  <Text type="danger">
                    Keep this invite id safe as you wont be able to generate it
                    again.
                  </Text>
                </p>
              </div>
            }
          />
        </Card>
      )}
    </Spin>
  );
};

export default CreateGroup;
