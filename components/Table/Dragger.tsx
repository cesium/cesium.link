import { MenuOutlined } from '@ant-design/icons';
import { SortableHandle } from 'react-sortable-hoc';

export const Dragger = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));
