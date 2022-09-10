import { SortableElement } from 'react-sortable-hoc';

export const SortableItem = SortableElement((props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr {...props} />
));
