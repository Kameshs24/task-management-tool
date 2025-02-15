import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext"; 
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router> 
      <TaskProvider> 
        <App />
      </TaskProvider>
    </Router>
  </StrictMode>
);
