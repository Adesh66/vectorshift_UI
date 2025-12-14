// conditionalNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const ConditionalNode = ({ id, data }) => {
  const config = {
    title: 'Conditional',
    fields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'select',
        defaultValue: data?.condition || 'greater',
        options: [
          { value: 'greater', label: 'Greater Than' },
          { value: 'less', label: 'Less Than' },
          { value: 'equal', label: 'Equal To' },
          { value: 'notEqual', label: 'Not Equal To' }
        ]
      },
      {
        name: 'threshold',
        label: 'Threshold',
        type: 'number',
        defaultValue: data?.threshold || 0,
        placeholder: '0'
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
        id: `${id}-true`,
        style: { top: '33%' }
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-false`,
        style: { top: '66%' }
      }
    ],
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-400',
    titleBgColor: 'bg-orange-100'
  };

  return <BaseNode id={id} data={data} config={config} />;
};
