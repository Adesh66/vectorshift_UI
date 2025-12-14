// inputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const config = {
    title: 'Input',
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: data?.inputName || id.replace('customInput-', 'input_')
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.inputType || 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]
      }
    ],
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-value`
      }
    ],
    bgColor: 'bg-green-50',
    borderColor: 'border-green-400',
    titleBgColor: 'bg-green-100'
  };

  return <BaseNode id={id} data={data} config={config} />;
};
