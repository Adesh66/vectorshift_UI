// databaseNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const DatabaseNode = ({ id, data }) => {
  const config = {
    title: 'Database',
    fields: [
      {
        name: 'dbType',
        label: 'Database',
        type: 'select',
        defaultValue: data?.dbType || 'postgres',
        options: [
          { value: 'postgres', label: 'PostgreSQL' },
          { value: 'mysql', label: 'MySQL' },
          { value: 'mongodb', label: 'MongoDB' },
          { value: 'redis', label: 'Redis' }
        ]
      },
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: data?.operation || 'SELECT',
        options: [
          { value: 'SELECT', label: 'SELECT' },
          { value: 'INSERT', label: 'INSERT' },
          { value: 'UPDATE', label: 'UPDATE' },
          { value: 'DELETE', label: 'DELETE' }
        ]
      },
      {
        name: 'query',
        label: 'Query',
        type: 'textarea',
        defaultValue: data?.query || '',
        placeholder: 'Enter SQL query'
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-params`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-result`
      }
    ],
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-400',
    titleBgColor: 'bg-violet-100'
  };

  return <BaseNode id={id} data={data} config={config} />;
};
