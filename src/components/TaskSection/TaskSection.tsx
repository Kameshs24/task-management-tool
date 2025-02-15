import React from "react";
import "./TaskSection.css";

interface TaskSectionProps {
  title: string;
  color: string;
  count: number;
  collapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const TaskSection: React.FC<TaskSectionProps> = ({ title, color, count, collapsed, onToggle, children }) => {
  return (
    <div className="task-section">
      <div className="task-section-header" style={{ backgroundColor: color }} onClick={onToggle}>
        <h3 className="section-title">{title} ({count})</h3>
        <span className="toggle-icon">{collapsed ? "⮟" : "⮝"}</span>
      </div>
      {!collapsed && <div className="task-section-content">{children}</div>}
    </div>
  );
};

export default TaskSection;
