import { useState } from 'react';
import { Button, Popconfirm, Space, notification } from 'antd';
import { CloseOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { useForms } from '../Context';
import { useEditing } from './Context';

function DeleteEntry({ record }) {
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch: dispatchForms } = useForms();

  const confirm = () => {
    setLoading(true);
    dispatchForms({ type: 'DELETE', slug: record.slug });
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
  const { forms, dispatch: dispatchForms } = useForms();
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
    const row = await editing.form.validateFields();
    if (forms.some((elem) => elem.slug === row.slug && row.slug !== record.slug)) {
      notification['error']({
        message: 'Invalid fields',
        description: 'Slug already exists'
      });
    } else {
      dispatchForms({ type: 'UPDATE', form: row, slug: record.slug, id });
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
