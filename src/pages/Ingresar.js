import React from 'react'

import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { useState } from 'react';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';

const {Title, Text} = Typography

export const Ingresar = () => {
  const [user] = useState(getUsuarioStorage())
  useHideMenu(false);
  const navigate = useNavigate();

  const onFinish = ({agent, desk}) => {
    console.log('Success:', agent, desk);
    localStorage.setItem('agent', agent);
    localStorage.setItem('desk', desk)
    navigate('/desk');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (user.agent && user.desk){
    return <Navigate to="/desk" />;

  }

  return (
    <>
      <Title level = {2}> Ingresar </Title>
      <Text>Enter your name and desk number</Text>
      <Divider/>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="name"
          name="agent"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desk"
          name="desk"
          rules={[
            {
              required: true,
              message: 'Please input your Desk!',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            shape="round">
            <SaveOutlined />
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>

  )
}
