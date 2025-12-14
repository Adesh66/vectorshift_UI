// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className="cursor-grab min-w-[100px] h-[70px] flex items-center justify-center flex-col rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border-2 border-blue-400 px-3 py-2 group"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <span className="text-white font-semibold text-sm text-center group-hover:scale-105 transition-transform duration-200">
            {label}
          </span>
      </div>
    );
  };
