const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

function isDAG(nodes, edges) {
  const graph = {};
  nodes.forEach((node) => {
    graph[node.id] = [];
  });

  edges.forEach((edge) => {
    const source = edge.source;
    const target = edge.target;
    if (graph[source]) {
      graph[source].push(target);
    }
  });

  const visited = new Set();
  const recStack = new Set();

  function hasCycle(nodeId) {
    visited.add(nodeId);
    recStack.add(nodeId);

    const neighbors = graph[nodeId] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (hasCycle(neighbor)) {
          return true;
        }
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }

    recStack.delete(nodeId);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (hasCycle(node.id)) {
        return false;
      }
    }
  }

  return true;
}

app.get("/", (req, res) => {
  res.json({ Ping: "Pong" });
});

app.post("/pipelines/parse", (req, res) => {
  try {
    const { nodes, edges } = req.body;

    if (!nodes || !edges) {
      return res.status(400).json({
        error: "Invalid request body. Expected nodes and edges arrays.",
      });
    }

    const num_nodes = nodes.length;
    const num_edges = edges.length;
    const is_dag = isDAG(nodes, edges);

    res.json({
      num_nodes,
      num_edges,
      is_dag,
    });
  } catch (error) {
    console.error("Error parsing pipeline:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`backend server running on http://localhost:${PORT}`);
  console.log(`CORS enabled for http://localhost:3000`);
});
