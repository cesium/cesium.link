import { SortableContainer } from 'react-sortable-hoc';

export const SortableBody = SortableContainer(
  (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />
);
