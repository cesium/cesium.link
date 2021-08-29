import { useState } from 'react';
import { useAccounts } from '../Context';
import { Modal, Tooltip, Button, Input, Space, Form } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Item } = Form;

function NewAccount() {
  const { accounts, dispatch } = useAccounts();
  const [isVisible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const ok = () => {
    form.submit();
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        New
      </Button>
      <Modal title="New Entry" visible={isVisible} onOk={ok} onCancel={() => setVisible(false)}>
        <Form
          form={form}
          onFinish={(values) =>
            dispatch({ type: 'CREATE', account: values }) && form.resetFields()
          }>
          <Item
            name="name"
            label={
              <Space>
                Name
                <Tooltip title="Don't worry, no one can see it.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </Space>
            }
            rules={[
              {
                required: true,
                message: 'Please insert a name.'
              }
            ]}>
            <Input placeholder="Name" />
          </Item>
          <Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Please insert a email.'
              },
              {
                type: 'email',
                message: 'This field must be a valid email.'
              },
              {
                validator: async (_, value) => {
                  if (accounts.some((elem) => elem.email === value)) {
                    return Promise.reject(new Error('Email already exists'));
                  } else {
                    Promise.resolve();
                  }
                }
              }
            ]}>
            <Input placeholder="admin@remax.pt" />
          </Item>
          <Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please insert a password.'
              }
            ]}>
            <Input.Password />
          </Item>
        </Form>
      </Modal>
    </>
  );
}

export default NewAccount;
