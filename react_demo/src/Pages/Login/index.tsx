// import React from "react";
import "./login.css";
import { Form, Input, Button, message } from "antd";
// import axios from "axios";
import request from "../../request";
import qs from "qs";
import { useHistory } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
  remember: boolean;
}

const Demo = () => {
  let isLogin = false;
  const history = useHistory();
  const onFinish = async (values: FormData) => {
    console.log("Success:", values);
    const res = await request.post("/api/login", qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data: responseResult.login = res.data;

    isLogin = data;

    if (isLogin) {
      history.replace("/");
    } else {
      message.error("登录失败");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item> */}

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Demo;
