import { CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, notification } from 'antd';
import { useState } from 'react';

import { useEditing } from '~/hooks/Editing';
import { useDeleteForm, useForms, useUpdateForm } from '~/hooks/forms';

function DeleteEntry({ record }) {
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutate } = useDeleteForm();

  const confirm = () => {
    setLoading(true);
    mutate(record.id);
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
      onCancel={() => setVisible(false)}
    >
      <Button onClick={() => setVisible(true)} type="link" danger>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
}

function Actions({ record }) {
  const { isLoading, data: forms } = useForms();
  const { mutate } = useUpdateForm();
  const { editing, dispatch: dispatchEditing } = useEditing();

  const edit = (record) => {
    editing.form.setFieldsValue({
      name: '',
      slug: '',
      url: '',
      ...record
    });
    dispatchEditing({ type: 'EDIT', key: record._id });
  };

  const save = async (id) => {
    if (isLoading) return;
    const row = await editing.form.validateFields();
    if (forms.some((elem) => elem.slug === row.slug && row.slug !== record.slug)) {
      notification['error']({
        message: 'Invalid fields',
        description: 'Slug already exists'
      });
    } else {
      mutate({ ...row, id });
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
