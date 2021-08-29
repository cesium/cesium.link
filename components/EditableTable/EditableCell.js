import { Input, InputNumber, Checkbox, Form } from 'antd';

const EditableCell = ({
  editing,
  dataIndex,
  required = true,
  title,
  inputType = 'text',
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'checkbox' ? <Checkbox /> : inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          {...(inputType == 'checkbox' && { valuePropName: 'checked' })}
          rules={[
            {
              required: required,
              message: `Please Input ${title}!`
            }
          ]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
