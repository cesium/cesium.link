import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space, Tooltip } from 'antd';
import { useState } from 'react';

import { useCreateForm, useForms } from '~/hooks/forms';
import { IForm } from '~/models/Form';

const { Item } = Form;

function NewForm() {
  const { isLoading, data: forms } = useForms();
  const { mutate } = useCreateForm();
  const [isVisible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const ok = () => {
    form.submit();
    setVisible(false);
  };

  const onFinish = (values: Partial<IForm>) => {
    mutate(values);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        New
      </Button>
      <Modal title="New Entry" visible={isVisible} onOk={ok} onCancel={() => setVisible(false)}>
        <Form form={form} onFinish={onFinish}>
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
            <Input placeholder="Nome do Formulário" />
          </Item>
          <Item
            name="slug"
            label="Slug"
            rules={[
              {
                required: true,
                message: 'Please insert a slug.'
              },
              {
                validator: async (_, value) => {
                  if (isLoading) return;
                  console.log('NEW', forms);
                  if (forms.some((elem) => elem.slug === value)) {
                    return Promise.reject(new Error('Slug already exists'));
                  } else {
                    Promise.resolve();
                  }
                }
              }
            ]}
          >
            <Input placeholder="id" />
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

export default NewForm;
