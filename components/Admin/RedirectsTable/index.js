import { useEffect, useState } from 'react';
import { Form, Typography, notification } from 'antd';
import { DateTime } from 'luxon';
import useAsyncReducer from '~/hooks/useAsyncReducer';
import { EditingContext, reducer as reducerEditing } from './Context';
import EditableTable from '../../EditableTable';
import Actions from './Actions';
import NewRedirect from './NewRedirect';

import API from '~/lib/api';
import { useRedirects } from '../Context';

function RedirectsTable() {
  const [loading, setLoading] = useState(true);
  const { redirects, dispatch } = useRedirects();
  const [form] = Form.useForm();
  const [editing, dispatchEditing] = useAsyncReducer(reducerEditing, { key: '', form: form });

  const isEditing = (record) => record._id === editing.key;

  useEffect(() => {
    API.get('/api/redirects')
      .then((response) => {
        dispatch({ type: 'INIT', redirects: response.data.data });
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

  const columns = [
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
      dataIndex: 'slug',
      render: function UrlLink(slug) {
        const link = `${process.env.NEXT_PUBLIC_APP_URL}/r/${slug}`;

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
        const formatted = DateTime.fromISO(updated)
          .toRelative(Date.now())
          .toLocaleString(DateTime.DATETIME_MED);
        return <Typography.Text>{formatted}</Typography.Text>;
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

  return (
    <EditingContext.Provider value={{ editing, dispatch: dispatchEditing }}>
      <EditableTable
        loading={loading}
        rowKey="slug"
        isEditing={isEditing}
        columns={columns}
        dataSource={redirects}
        bordered
        form={form}
        pagination={{
          onChange: () => dispatchEditing({ type: 'CANCEL' }),
          position: ['bottomCenter']
        }}
        footer={() => <NewRedirect />}
      />
    </EditingContext.Provider>
  );
}

export default RedirectsTable;
