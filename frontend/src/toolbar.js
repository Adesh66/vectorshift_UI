// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="px-6 py-5 bg-white border-b-2 border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="m-0 text-lg font-semibold text-slate-800">
                    Pipeline Nodes
                </h2>
                <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    Drag & Drop to Canvas
                </span>
            </div>
            <div className="flex flex-wrap gap-3">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='conditional' label='Conditional' />
            </div>
        </div>
    );
};
