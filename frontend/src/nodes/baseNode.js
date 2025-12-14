import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data,
  config = {}
}) => {
  const {
    title = 'Node',
    fields = [],
    handles = [],
    bgColor = 'bg-white',
    borderColor = 'border-slate-300',
    titleBgColor = 'bg-slate-50',
    contentComponent = null,
  } = config;

  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    return initialValues;
  });
  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    if (data?.onFieldChange) {
      data.onFieldChange(fieldName, value);
    }
  };

  
  const renderField = (field) => {
    const value = fieldValues[field.name];

    switch (field.type) {
      case 'text':
        return (
          <label key={field.name} className="flex flex-col text-xs text-slate-600 gap-1">
            <span className="font-medium">{field.label}:</span>
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="px-2 py-1.5 border border-slate-300 rounded text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder={field.placeholder || ''}
            />
          </label>
        );

      case 'select':
        return (
          <label key={field.name} className="flex flex-col text-xs text-slate-600 gap-1">
            <span className="font-medium">{field.label}:</span>
            <select
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="px-2 py-1.5 border border-slate-300 rounded text-xs w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        );

      case 'textarea':
        return (
          <label key={field.name} className="flex flex-col text-xs text-slate-600 gap-1">
            <span className="font-medium">{field.label}:</span>
            <textarea
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="px-2 py-1.5 border border-slate-300 rounded text-xs w-full resize-y min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder={field.placeholder || ''}
            />
          </label>
        );

      case 'number':
        return (
          <label key={field.name} className="flex flex-col text-xs text-slate-600 gap-1">
            <span className="font-medium">{field.label}:</span>
            <input
              type="number"
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="px-2 py-1.5 border border-slate-300 rounded text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder={field.placeholder || ''}
              min={field.min}
              max={field.max}
              step={field.step}
            />
          </label>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-[220px] min-h-[80px] border-2 ${borderColor} rounded-lg ${bgColor} p-3 shadow-md hover:shadow-lg transition-shadow`}>
      {/* Render handles */}
      {handles.map((handle, index) => (
        <Handle
          key={`${handle.type}-${handle.id || index}`}
          type={handle.type}
          position={handle.position || (handle.type === 'target' ? Position.Left : Position.Right)}
          id={handle.id || `${id}-${handle.type}-${index}`}
          className="w-3 h-3 !bg-slate-400 border-2 border-white hover:!bg-blue-500 transition-colors"
          style={handle.style || {}}
        />
      ))}

      {/* Title */}
      <div className={`font-bold mb-2 text-slate-800 text-sm border-b border-slate-200 pb-2 ${titleBgColor} -mx-3 -mt-3 px-3 pt-3 rounded-t-md`}>
        <span>{title}</span>
      </div>

      {/* Custom content component */}
      {contentComponent && (
        <div className="mt-2">
          {contentComponent({ fieldValues, handleFieldChange, id, data })}
        </div>
      )}

      {/* Fields */}
      {fields.length > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          {fields.map(field => renderField(field))}
        </div>
      )}
    </div>
  );
};
