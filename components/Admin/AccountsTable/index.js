import { useEffect, useState } from 'react';
import { Avatar, Checkbox, Form, Typography, notification } from 'antd';
import { DateTime } from 'luxon';
import { getNameInitials, getHexColor } from '~/lib/strings';
import useAsyncReducer from '~/hooks/useAsyncReducer';
import { EditingContext, reducer as reducerEditing } from './Context';
import EditableTable from '~/components/EditableTable';
import { useAccounts } from '~/components/Admin/Context';
import Actions from './Actions';
import NewAccount from './NewAccount';

import API from '~/lib/api';

function AccountsTable() {
  const [loading, setLoading] = useState(true);
  const { accounts, dispatch } = useAccounts();
  const [form] = Form.useForm();
  const [editing, dispatchEditing] = useAsyncReducer(reducerEditing, { key: '', form: form });

  const isEditing = (record) => record._id === editing.key;

  useEffect(() => {
    API.get('/api/accounts')
      .then((response) => {
        dispatch({ type: 'INIT', accounts: response.data.data });
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
      title: 'Photo',
      width: 50,
      render: function Photo(_, record) {
        return (
          <Avatar style={{ backgroundColor: getHexColor(record.name) }}>
            {getNameInitials(record.name)}
          </Avatar>
        );
      }
    },
    {
      title: 'Name',
      editable: true,
      required: false,
      width: 350,
      dataIndex: 'name'
    },
    {
      title: 'Admin',
      editable: true,
      inputType: 'checkbox',
      align: 'center',
      width: 30,
      dataIndex: 'admin',
      render: function Admin(state) {
        return <Checkbox checked={state} disabled={true} />;
      }
    },
    {
      title: 'Email',
      editable: true,
      width: 475,
      dataIndex: 'email'
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
        rowKey="_id"
        isEditing={isEditing}
        columns={columns}
        dataSource={accounts}
        bordered
        form={form}
        pagination={{
          onChange: () => dispatchEditing({ type: 'CANCEL' }),
          position: ['bottomCenter']
        }}
        footer={() => <NewAccount />}
      />
    </EditingContext.Provider>
  );
}

export default AccountsTable;
