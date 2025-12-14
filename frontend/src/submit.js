import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      const pipelineData = {
        nodes: nodes,
        edges: edges,
      };

      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pipelineData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const alertMessage = `Number of Nodes: ${result.num_nodes} Number of Edges: ${result.num_edges} and is_dag: ${result.is_dag}`;

      alert(alertMessage);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert(
        `Error submitting pipeline: ${error.message}\n\nPlease make sure the backend server is running on http://localhost:8000`
      );
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-5 bg-white border-t-2 border-slate-200 shadow-lg">
      <button
        type="submit"
        onClick={handleSubmit}
        className="px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 border-none rounded-lg cursor-pointer shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-green-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Submit Pipeline
      </button>
    </div>
  );
};
