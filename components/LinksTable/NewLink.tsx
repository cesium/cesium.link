import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal, Tooltip } from 'antd';
import { useState } from 'react';

import { useLinks } from '~/hooks/links';
import { useCreateLink } from '~/hooks/links/useCreateLink';
import { ILink } from '~/models/Link';

const { Item } = Form;

function NewLink() {
  const { data: links } = useLinks();
  const { mutate } = useCreateLink();
  const [isVisible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const ok = () => {
    form.submit();
    setVisible(false);
  };

  const onFinish = (values: Partial<ILink>) => {
    mutate({ ...values, index: links.length });
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
            name="emoji"
            label={
              <span>
                Emoji&nbsp;
                <Tooltip title="It can be just an unicode character (🎄) or slack emoji style (:book:)">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: 'Please select an emoji.'
              }
            ]}
          >
            <Input defaultValue="" placeholder=":emoji:" />
          </Item>
          <Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please insert a title.'
              }
            ]}
          >
            <Input placeholder="Awesome Link Name" />
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
            <Input placeholder="https://cesium.link" />
          </Item>
          <Item name="attention" valuePropName="checked">
            <Checkbox defaultChecked={false}>Attention</Checkbox>
          </Item>
        </Form>
      </Modal>
    </>
  );
}

export default NewLink;
