import { Button, Space } from 'antd';

import { useUpdateLink } from '~/hooks/links';

function Actions({ record }) {
  const { mutate } = useUpdateLink();

  const archiveLink = () => {
    mutate({ ...record, archived: true });
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
