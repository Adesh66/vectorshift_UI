import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4 shadow-lg">
        <h1 className="m-0 text-2xl font-bold tracking-tight">
          VectorShift Pipeline Builder
        </h1>
        <p className="text-sm text-slate-300 mt-1">Build and visualize your data pipelines</p>
      </header>
      <PipelineToolbar />
      <div className="flex-1 flex flex-col">
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
