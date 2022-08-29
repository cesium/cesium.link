import { Table } from 'antd';

import { useArchivedLinks } from '~/hooks/links';

import { COLUMNS } from './config';

function LinksTable() {
  const { isLoading, data: links } = useArchivedLinks();

  return (
    <Table
      loading={isLoading}
      rowKey="index"
      columns={COLUMNS}
      dataSource={links}
      bordered
      pagination={{
        position: ['bottomCenter']
      }}
    />
  );
}

export default LinksTable;
