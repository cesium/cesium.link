import { Checkbox, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Twemoji } from 'react-emoji-render';

import { Dragger } from '~/components/Table';
import { ILink } from '~/models/Link';

import Actions from './Actions';
import styles from './style.module.css';

export const COLUMNS: ColumnsType<ILink> = [
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
