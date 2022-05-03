import { useState } from 'react';
import { useArchivedLinks } from '../Context';
import { Space, Popconfirm, Button } from 'antd';

function Actions({ record }) {
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useArchivedLinks();

  const confirmDelete = () => {
    setLoading(true);
    dispatch({ type: 'DELETE', id: record._id, index: record.index });
    setVisible(false);
    setLoading(false);
  };

  const unarchiveLink = () => {
    setLoading(true);
    dispatch({ type: 'UNARCHIVE', id: record._id, link: record });
    setLoading(false);
  };

  return (
    <Space size="middle">
      <Button onClick={() => unarchiveLink()} type="link" danger>
        Unarchive
      </Button>
      <Popconfirm
        title="Are you sure?"
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
