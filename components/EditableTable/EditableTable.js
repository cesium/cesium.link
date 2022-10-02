import { Form, Table } from 'antd';

import EditableCell from './EditableCell';

const EditableTable = ({ form, isEditing, columns, ...props }) => {
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.inputType || 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell
          }
        }}
        columns={mergedColumns}
        {...props}
      />
    </Form>
  );
};

export default EditableTable;
