import React from "react";
import Header from "../../components/Header/Header";
import TaskBoard from "../../components/TaskBoard/TaskBoard";
import "./TaskBoardView.css";

const TaskBoardView: React.FC = () => {
  return (
    <div className="task-view-container">
      <Header /> 
      <TaskBoard />
    </div>
  );
};

export default TaskBoardView;
