import { useEffect, useState } from 'react';
import { useLinks } from '../Context';
import { MenuOutlined } from '@ant-design/icons';
import { Table, Checkbox, notification } from 'antd';
import { Twemoji } from 'react-emoji-render';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import Actions from './Actions';
import NewLink from './NewLink';

import API from '../../../utils/api';
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
    className: styles.visible
  },
  {
    title: 'Attention',
    dataIndex: 'attention',
    align: 'center',
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
  const { dispatch } = useLinks();

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
  const { links } = useLinks();
  // function findIndex base on Table rowKey props and should always be a right array index
  const index = links.findIndex((x) => x.index === restProps['data-row-key']);
  return <SortableItem index={index} {...restProps} />;
};

function LinksTable() {
  const [loading, setLoading] = useState(true);
  const { links, dispatch } = useLinks();

  useEffect(() => {
    API.get('/links')
      .then((response) => {
        dispatch({ type: 'INIT', links: response.data.data });
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
