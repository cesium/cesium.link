import { Table } from 'antd';
import { arrayMoveImmutable } from 'array-move';

import { SortableBody, SortableItem } from '~/components/Table';
import { useLinks, useUpdateLink } from '~/hooks/links';

import NewLink from './NewLink';
import { COLUMNS } from './config';
import styles from './style.module.css';

const sortLinks = (links, mutate, { oldIndex, newIndex }) => {
  if (oldIndex !== newIndex) {
    return arrayMoveImmutable([].concat(links), oldIndex, newIndex)
      .filter((elem) => !!elem)
      .map((elem, index) => {
        mutate({ ...elem, index });
      });
  }

  return links;
};

const DraggableContainer = (props) => {
  const { data: links } = useLinks();
  const { mutate } = useUpdateLink();

  return (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass={styles.dragging}
      onSortEnd={(args) => sortLinks(links, mutate, args)}
      {...props}
    />
  );
};

const DraggableBodyRow = ({ ...restProps }) => {
  const { isLoading, data: links } = useLinks();
  if (isLoading) return null;
  // function findIndex base on Table rowKey props and should always be a right array index
  const index = links.findIndex((x) => x.index === restProps['data-row-key']);
  return <SortableItem index={index} {...restProps} />;
};

function LinksTable() {
  const { isLoading, data: links } = useLinks();

  return (
    <Table
      loading={isLoading}
      rowKey="index"
      columns={COLUMNS}
      dataSource={links}
      bordered
      pagination={false}
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow
        }
      }}
      footer={() => <NewLink />}
    />
  );
}

export default LinksTable;
