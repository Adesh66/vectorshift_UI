// filterNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data }) => {
  const config = {
    title: 'Filter',
    fields: [
      {
        name: 'filterCondition',
        label: 'Condition',
        type: 'select',
        defaultValue: data?.filterCondition || 'contains',
        options: [
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'startsWith', label: 'Starts With' },
          { value: 'endsWith', label: 'Ends With' }
        ]
      },
      {
        name: 'filterValue',
        label: 'Value',
        type: 'text',
        defaultValue: data?.filterValue || '',
        placeholder: 'Enter filter value'
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-input`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-output`
      }
    ],
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-400',
    titleBgColor: 'bg-amber-100'
  };

  return <BaseNode id={id} data={data} config={config} />;
};
