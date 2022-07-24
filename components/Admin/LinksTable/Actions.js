import { useState } from 'react';
import { useLinks } from '../Context';
import { Space, Popconfirm, Button } from 'antd';

function Actions({ record }) {
  const { dispatch } = useLinks();

  const archiveLink = () => {
    dispatch({ type: 'ARCHIVE', id: record._id, link: record });
  };

  return (
    <Space size="middle">
      <Button onClick={() => archiveLink()} type="link" danger>
        Archive
      </Button>
    </Space>
  );
}

export default Actions;
