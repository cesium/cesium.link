import { useState } from 'react';
import { useRedirects } from '../Context';
import { Modal, Tooltip, Button, Input, Space, Form } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Item } = Form;

function NewRedirect() {
  const { redirects, dispatch } = useRedirects();
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
            dispatch({ type: 'CREATE', redirect: values }) && form.resetFields()
          }
        >
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
            ]}
          >
            <Input placeholder="Title" />
          </Item>
          <Item
            name="slug"
            label="Slug"
            rules={[
              {
                message: 'Please insert a slug.'
              },
              {
                validator: async (_, value) => {
                  if (redirects.some((elem) => elem.slug === value)) {
                    return Promise.reject(new Error('Slug already exists'));
                  } else {
                    Promise.resolve();
                  }
                }
              }
            ]}
          >
            <Input placeholder="slug" />
          </Item>
          <Item
            name="url"
            label="URL"
            rules={[
              {
                required: true,
                message: 'Please insert a url.'
              },
              {
                type: 'url',
                message: 'This field must be a valid url.'
              }
            ]}
          >
            <Input placeholder="https://goo.gl/form" />
          </Item>
        </Form>
      </Modal>
    </>
  );
}

export default NewRedirect;
