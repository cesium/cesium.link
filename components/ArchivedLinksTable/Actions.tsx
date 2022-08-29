import { Button, Popconfirm, Space } from 'antd';
import { useState } from 'react';

import { useDeleteLink, useUpdateLink } from '~/hooks/links';

function Actions({ record }) {
  const [isVisible, setVisible] = useState(false);
  const { isLoading: isUpdateLoading, mutate: updateLink } = useUpdateLink();
  const { isLoading: isDeleteLoading, mutate: deleteLink } = useDeleteLink();

  const isLoading = isUpdateLoading || isDeleteLoading;

  const archiveLink = () => {
    updateLink({ ...record, archived: false });
  };

  const destroyLink = () => {
    deleteLink(record);
  };

  return (
    <Space size="middle">
      <Button onClick={archiveLink} type="link" danger>
        Unarchive
      </Button>
      <Popconfirm
        title="Are you sure?"
        okText="Yes"
        cancelText="No"
        visible={isVisible}
        onConfirm={destroyLink}
        okButtonProps={{ loading: isLoading }}
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
