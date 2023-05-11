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
import { useRouter } from "next/router";

const { Meta } = Card;

const JoinGroup = () => {
  const { token } = theme.useToken();
  const router = useRouter();
  const [joiningGroup, setJoiningGroup] = useState(false);

  const onFinish = async (values) => {
    if (joiningGroup) return;
    setJoiningGroup(true);
    try {
      const joinedGroup = await axios.post(
        `/api/groups/join/${values.invite_id}`,
        {
          name: values.name,
          leetcodeUsername: values.leetcodeUsername,
          email: values.email,
        }
      );

      message.success(
        `${values.leetcodeUsername}  joined group'${joinedGroup.data.name}'!`
      );
      router.replace(`/groups/${joinedGroup.data.id}`);
    } catch (error) {
        console.log(error)
      message.error(error.message);
    }
    setJoiningGroup(false);
  };
  return (
    <Form
      disabled={joiningGroup}
      labelCol={{ span: 12 }}
      style={{ width: 350 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Invite ID"
        name="invite_id"
        rules={[
          {
            required: true,
            message: "Please enter group invite.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Your Name"
        name="name"
        rules={[{ required: true, message: "Please enter your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Leetcode Username"
        name="leetcodeUsername"
        rules={[
          { required: true, message: "Please input a valid leetcode username" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Your Email"
        name="email"
        rules={[{ required: true, message: "Please enter your email!" }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          disabled={joiningGroup}
          loading={joiningGroup}
          type="primary"
          htmlType="submit"
        >
          Join
        </Button>
      </Form.Item>
    </Form>
  );
};

export default JoinGroup;
