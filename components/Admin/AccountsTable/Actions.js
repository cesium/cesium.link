import { useState } from 'react';
import { Button, Popconfirm, Space, notification } from 'antd';
import { CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useAccounts } from '../Context';
import { useEditing } from './Context';

function DeleteEntry({ record }) {
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch: dispatchAccounts } = useAccounts();

  const confirm = () => {
    setLoading(true);
    dispatchAccounts({ type: 'DELETE', id: record._id });
    setVisible(false);
    setLoading(false);
  };

  return (
    <Popconfirm
      title="Are you sure?"
      okText="Yes"
      cancelText="No"
      visible={isVisible}
      onConfirm={confirm}
      okButtonProps={{ loading: loading }}
      onCancel={() => setVisible(false)}>
      <Button onClick={() => setVisible(true)} type="link" danger>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
}

function Actions({ record }) {
  const { accounts, dispatch: dispatchAccounts } = useAccounts();
  const { editing, dispatch: dispatchEditing } = useEditing();

  const edit = (record) => {
    editing.form.setFieldsValue({
      name: '',
      admin: false,
      email: '',
      ...record
    });
    dispatchEditing({ type: 'EDIT', key: record._id });
  };

  const save = async (id) => {
    const row = await editing.form.validateFields();
    if (accounts.some((elem) => elem.email === row.email && row.email !== record.email)) {
      notification['error']({
        message: 'Invalid fields',
        description: 'Email already exists'
      });
    } else {
      dispatchAccounts({ type: 'UPDATE', account: row, id });
      dispatchEditing({ type: 'CANCEL' });
    }
  };

  return record._id === editing.key ? (
    <Space>
      <Button onClick={() => save(record._id)} type="link">
        <SaveOutlined />
      </Button>
      <Button onClick={() => dispatchEditing({ type: 'CANCEL' })} type="link" danger>
        <CloseOutlined />
      </Button>
    </Space>
  ) : (
    <Space size="middle">
      <Button disabled={editing.key !== ''} onClick={() => edit(record)} type="link">
        <EditOutlined />
      </Button>
      <DeleteEntry record={record} />
    </Space>
  );
}

export default Actions;
