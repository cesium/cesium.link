import { Dropdown, Space, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Twemoji } from 'react-emoji-render';
import { QRCode } from 'react-qrcode-logo';

import { ILink } from '~/models/Link';

import LinkWithQRCode from '../LinkWithQRCode';
import Actions from './Actions';
import styles from './style.module.css';

export const COLUMNS: ColumnsType<ILink> = [
  {
    title: 'Emoji',
    dataIndex: 'emoji',
    fixed: 'left',
    align: 'center',
    width: 40,
    className: styles.Visible,
    render: function Emoji(emoji) {
      return <Twemoji svg text={emoji} />;
    }
  },
  {
    title: 'Title',
    dataIndex: 'title',
    width: 250,
    className: styles.Visible
  },
  {
    title: 'URL',
    dataIndex: 'url',
    className: styles.Visible,
    render: function Url(url) {
      return <a href={url}>{url}</a>;
    }
  },
  {
    title: 'Link',
    width: 400,
    dataIndex: 'link',
    render: function UrlLink(url) {
      return <LinkWithQRCode link={url} />;
    }
  },
  {
    title: 'Clicks',
    dataIndex: 'clicks',
    align: 'center',
    width: 40,
    className: styles.Visible
  },
  {
    title: 'Action',
    fixed: 'right',
    render: function Action(_, record) {
      return <Actions record={record} />;
    }
  }
];
