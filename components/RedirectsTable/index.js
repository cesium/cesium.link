import EditableTable from '~/components/EditableTable';
import { useEditing } from '~/hooks/Editing';
import { useRedirects } from '~/hooks/redirects';

import NewRedirect from './NewRedirect';
import { REDIRECTS_COLUMNS } from './config';

function RedirectsTable() {
  const { isLoading, data: redirects } = useRedirects();
  const { editing, dispatch } = useEditing();

  const isEditing = (record) => record._id === editing.key;

  if (isLoading) return null;

  return (
    <EditableTable
      loading={isLoading}
      rowKey="slug"
      isEditing={isEditing}
      columns={REDIRECTS_COLUMNS}
      dataSource={redirects}
      bordered
      form={editing.form}
      pagination={{
        onChange: () => dispatch({ type: 'CANCEL' }),
        position: ['bottomCenter']
      }}
      footer={() => <NewRedirect />}
    />
  );
}

export default RedirectsTable;
