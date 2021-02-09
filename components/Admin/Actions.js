import { useState } from "react";
import { useLinks } from "./Context";
import { Space, Popconfirm, Button } from "antd";

function Actions({ record }) {
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useLinks();

  const confirmDelete = () => {
    setLoading(true);
    dispatch({ type: "DELETE", id: record._id });
    setVisible(false);
    setLoading(false);
  };

  return (
    <Space size="middle">
      <Popconfirm
        title="Are you sure you?"
        okText="Yes"
        cancelText="No"
        visible={isVisible}
        onConfirm={confirmDelete}
        okButtonProps={{ loading: loading }}
        onCancel={() => setVisible(false)}
      >
        <Button onClick={() => setVisible(true)} type="link" danger>
          Delete
        </Button>
      </Popconfirm>
    </Space>
  );
}

export default Actions;
