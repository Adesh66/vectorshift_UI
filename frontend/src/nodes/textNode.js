
import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeSize, setNodeSize] = useState({ width: 250, height: 100 });
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    const regex = /\{\{\s*(\w+)\s*\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(currText)) !== null) {
      const variableName = match[1];
      if (!matches.includes(variableName)) {
        matches.push(variableName);
      }
    }
    
    setVariables(matches);
  }, [currText]);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      
      textarea.style.height = 'auto';
      
      const newHeight = Math.max(100, Math.min(textarea.scrollHeight + 80, 400));
      const lines = currText.split('\n').length;
      const maxLineLength = Math.max(...currText.split('\n').map(line => line.length));
      const newWidth = Math.max(250, Math.min(maxLineLength * 8 + 40, 500));
      
      setNodeSize({ width: newWidth, height: newHeight });
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div 
      className="border-2 border-yellow-400 rounded-lg bg-yellow-50 p-3 shadow-md hover:shadow-lg transition-shadow"
      style={{ width: nodeSize.width, minHeight: nodeSize.height }}
    >
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          className="w-3 h-3 !bg-yellow-400 border-2 border-white hover:!bg-yellow-600 transition-colors"
          style={{
            top: `${((index + 1) * 100) / (variables.length + 1)}%`
          }}
          title={variable}
        />
      ))}
      
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-3 h-3 !bg-yellow-400 border-2 border-white hover:!bg-yellow-600 transition-colors"
      />

      {/* Title */}
      <div className="font-bold mb-2 text-slate-800 text-sm border-b border-yellow-300 pb-2 bg-yellow-100 -mx-3 -mt-3 px-3 pt-3 rounded-t-md">
        <span>Text</span>
      </div>

      {/* Text input area */}
      <div className="mt-2">
        <label className="flex flex-col text-xs text-slate-600 gap-1">
          <span className="font-medium">Text:</span>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            className="px-2 py-2 border border-yellow-400 rounded text-xs w-full resize-none min-h-[60px] font-mono bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all overflow-hidden"
            placeholder="Enter text with variables like {{variable}}"
          />
        </label>
      </div>

      {variables.length > 0 && (
        <div className="mt-2 text-[11px] text-stone-600 px-2 py-1.5 bg-yellow-100 rounded border border-yellow-200">
          <strong>Variables:</strong> {variables.join(', ')}
        </div>
      )}
    </div>
  );
};
