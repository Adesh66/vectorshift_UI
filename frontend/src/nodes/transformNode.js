// transformNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TransformNode = ({ id, data }) => {
  const config = {
    title: 'Transform',
    fields: [
      {
        name: 'transformType',
        label: 'Operation',
        type: 'select',
        defaultValue: data?.transformType || 'uppercase',
        options: [
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'trim', label: 'Trim' },
          { value: 'reverse', label: 'Reverse' }
        ]
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
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-400',
    titleBgColor: 'bg-purple-100'
  };

  return <BaseNode id={id} data={data} config={config} />;
};
