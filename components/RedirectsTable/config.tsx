import { Typography } from 'antd';

import { formatFromNow } from '~/lib/utils/date';

import Actions from './Actions';

export const REDIRECTS_COLUMNS = [
  {
    title: 'Name',
    editable: true,
    required: false,
    width: 250,
    dataIndex: 'name'
  },
  {
    title: 'Slug',
    editable: true,
    width: 175,
    dataIndex: 'slug'
  },
  {
    title: 'URL',
    editable: true,
    dataIndex: 'url',
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
    title: 'Visits',
    editable: false,
    align: 'center',
    width: 40,
    dataIndex: 'visits'
  },
  {
    title: 'Last edited',
    editable: false,
    width: 150,
    dataIndex: 'updated',
    render: function Updated(updated) {
      return <Typography.Text>{formatFromNow(updated)}</Typography.Text>;
    }
  },
  {
    title: 'Actions',
    fixed: 'right',
    render: function Action(_, record) {
      return <Actions record={record} />;
    }
  }
];
