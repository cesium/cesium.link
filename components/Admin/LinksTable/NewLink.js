import { useState } from 'react';
import { useLinks } from '../Context';
import { Modal, Tooltip, Button, Input, Checkbox, Form } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Item } = Form;

function NewLink() {
  const { dispatch } = useLinks();
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
          onFinish={(values) => dispatch({ type: 'CREATE', link: values }) && form.resetFields()}
        >
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
