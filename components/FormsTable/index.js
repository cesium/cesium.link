import EditableTable from '~/components/EditableTable';
import { useEditing } from '~/hooks/Editing';
import { useForms } from '~/hooks/forms';

import NewForm from './NewForm';
import { FORMS_COLUMNS } from './config';

function FormsTable() {
  const { isLoading, data: forms } = useForms();
  const { editing, dispatch } = useEditing();

  const isEditing = (record) => record._id === editing.key;
  console.log('Index', forms);
  if (isLoading) return null;

  return (
    <EditableTable
      loading={isLoading}
      rowKey="slug"
      isEditing={isEditing}
      columns={FORMS_COLUMNS}
      dataSource={forms}
      bordered
      form={editing.form}
      pagination={{
        onChange: () => dispatch({ type: 'CANCEL' }),
        position: ['bottomCenter']
      }}
      footer={() => <NewForm />}
    />
  );
}

export default FormsTable;
