// apiNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const ApiNode = ({ id, data }) => {
  const config = {
    title: 'API',
    fields: [
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: data?.method || 'GET',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' }
        ]
      },
      {
        name: 'endpoint',
        label: 'Endpoint',
        type: 'text',
        defaultValue: data?.endpoint || '',
        placeholder: 'https://api.example.com'
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-params`,
        style: { top: '33%' }
      },
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-body`,
        style: { top: '66%' }
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-response`
      }
    ],
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-400',
    titleBgColor: 'bg-cyan-100'
  };

  return <BaseNode id={id} data={data} config={config} />;
};
