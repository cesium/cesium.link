import { useEffect, useState } from 'react';
import { useArchivedLinks } from '../Context';
import { Checkbox, Table, Typography, notification } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Twemoji } from 'react-emoji-render';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import Actions from './Actions';

import API from '~/lib/api';
import styles from './style.module.css';

const Dragger = sortableHandle(() => <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />);

const columns = [
  {
    title: '#',
    width: 40,
    className: styles.visible,
    render: function Order() {
      return <Dragger />;
    }
  },
  {
    title: 'Emoji',
    dataIndex: 'emoji',
    fixed: 'left',
    align: 'center',
    width: 40,
    className: styles.visible,
    render: function Emoji(emoji) {
      return <Twemoji svg text={emoji} />;
    }
  },
  {
    title: 'Title',
    dataIndex: 'title',
    width: 250,
    className: styles.visible
  },
  {
    title: 'Attention',
    dataIndex: 'attention',
    align: 'center',
    width: 40,
    render: function Attention(state) {
      return <Checkbox checked={state} disabled={true} />;
    }
  },
  {
    title: 'URL',
    dataIndex: 'url',
    className: styles.visible,
    render: function Url(url) {
      return <a href={url}>{url}</a>;
    }
  },
  {
    title: 'Link',
    editable: false,
    width: 300,
    dataIndex: 'link',
    render: function UrlLink(link) {
      return (
        <Typography.Link href={link} copyable>
          {link}
        </Typography.Link>
      );
    }
  },
  {
    title: 'Clicks',
    dataIndex: 'clicks',
    align: 'center',
    width: 40,
    className: styles.visible
  },
  {
    title: 'Action',
    fixed: 'right',
    render: function Action(_, record) {
      return <Actions record={record} />;
    }
  }
];

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

const DraggableContainer = (props) => {
  const { dispatch } = useArchivedLinks();

  return (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass={styles.dragging}
      onSortEnd={({ oldIndex, newIndex }) =>
        dispatch({ type: 'SORT', oldIndex: oldIndex, newIndex: newIndex })
      }
      {...props}
    />
  );
};

const DraggableBodyRow = ({ ...restProps }) => {
  const { archived } = useArchivedLinks();
  // function findIndex base on Table rowKey props and should always be a right array index
  const index = archived.findIndex((x) => x.index === restProps['data-row-key']);
  return <SortableItem index={index} {...restProps} />;
};

function ArchivedarchivedTable() {
  const [loading, setLoading] = useState(true);
  const { archived, dispatch } = useArchivedLinks();

  useEffect(() => {
    API.get('/api/links?status=archived')
      .then((response) => {
        console.log(response.data.data);
        dispatch({ type: 'INIT', archived: response.data.data });
        setLoading(false);
      })
      .catch((error) => {
        notification['error']({
          message: `${error.statusText}`,
          description: error.message
        });
      });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <Table
      loading={loading}
      rowKey="index"
      columns={columns}
      dataSource={archived}
      bordered
      pagination={false}
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow
        }
      }}
    />
  );
}

export default ArchivedarchivedTable;
