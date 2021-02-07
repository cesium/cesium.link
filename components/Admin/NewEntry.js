import { useState } from "react";
import { Modal, Tooltip, Button, Input, Checkbox, Form } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import API from "../../utils/api";

const { Item } = Form;

function NewEntry() {
  const [isVisible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const ok = () => {
    form.submit();
    setVisible(false);
  };

  async function submit(values) {
    await API.post("/links", values);
  }

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        New
      </Button>
      <Modal
        title="New Entry"
        visible={isVisible}
        onOk={ok}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} onFinish={submit}>
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
          >
            <Input placeholder=":emoji:" />
          </Item>
          <Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please insert a Title",
              },
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
                message: "Please insert a URL",
              },
            ]}
          >
            <Input placeholder="https://cesium.link" />
          </Item>
          <Item name="description" label="Description">
            <Input.TextArea />
          </Item>
          <Item name="atention" valuePropName="checked">
            <Checkbox defaultChecked={false}>Atention</Checkbox>
          </Item>
        </Form>
      </Modal>
    </>
  );
}

export default NewEntry;
