// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    fields: [],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-system`,
        style: { top: `${100/3}%` }
      },
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-prompt`,
        style: { top: `${200/3}%` }
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-response`
      }
    ],
    contentComponent: () => (
      <div className="text-xs text-slate-600">
        <span>This is a LLM.</span>
      </div>
    ),
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-400',
    titleBgColor: 'bg-blue-100'
  };

  return <BaseNode id={id} data={data} config={config} />;
};
