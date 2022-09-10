import { useContext } from 'react';

import { EditingContext } from './EditingContext';

export const useEditing = () => useContext(EditingContext);
