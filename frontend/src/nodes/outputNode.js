// outputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const config = {
    title: 'Output',
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: data?.outputName || id.replace('customOutput-', 'output_')
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.outputType || 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-value`
      }
    ],
    bgColor: 'bg-red-50',
    borderColor: 'border-red-400',
    titleBgColor: 'bg-red-100'
  };

  return <BaseNode id={id} data={data} config={config} />;
};
