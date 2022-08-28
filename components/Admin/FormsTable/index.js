import { useEffect, useState } from 'react';
import { Form, Typography, notification } from 'antd';
import useAsyncReducer from '~/hooks/useAsyncReducer';
import { formatFromNow } from '~/lib/utils/date';
import { EditingContext, reducer as reducerEditing } from './Context';
import EditableTable from '../../EditableTable';
import Actions from './Actions';
import NewForm from './NewForm';

import API from '~/lib/api';
import { useForms } from '../Context';

function FormsTable() {
  const [loading, setLoading] = useState(true);
  const { forms, dispatch } = useForms();
  const [form] = Form.useForm();
  const [editing, dispatchEditing] = useAsyncReducer(reducerEditing, { key: '', form: form });

  const isEditing = (record) => record._id === editing.key;

  useEffect(() => {
    API.get('/api/forms')
      .then((response) => {
        dispatch({ type: 'INIT', forms: response.data.data });
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

  return (
    <EditingContext.Provider value={{ editing, dispatch: dispatchEditing }}>
      <EditableTable
        loading={loading}
        rowKey="slug"
        isEditing={isEditing}
        columns={columns}
        dataSource={forms}
        bordered
        form={form}
        pagination={{
          onChange: () => dispatchEditing({ type: 'CANCEL' }),
          position: ['bottomCenter']
        }}
        footer={() => <NewForm />}
      />
    </EditingContext.Provider>
  );
}

export default FormsTable;
