import React from "react";
import Header from "../../components/Header/Header";
import TaskList from "../../components/TaskList/TaskList";
import "./TaskListView.css";
import TaskTableHeader from "../../components/TaskTableHeader/TaskTableHeader";

const TaskListView: React.FC = () => {
  return (
    <div className="task-list-view">
      <Header /> 
      <TaskTableHeader/>
      <TaskList />
    </div>
  );
};

export default TaskListView;
