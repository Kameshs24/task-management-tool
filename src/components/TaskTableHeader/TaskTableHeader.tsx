import React from "react";
import "./TaskTableHeader.css";

const TaskTableHeader: React.FC = () => {
  return (
    <>
      <hr className="table-header-divider" />
      <div className="task-table-header">
      <span className="column">Task Name</span>
      <span className="column">Due On ⬍</span>
      <span className="column">Task Status</span>
      <span className="column">Task Category</span>
      <div className="column"></div> 
    </div>
    </>
    
  );
};

export default TaskTableHeader;
