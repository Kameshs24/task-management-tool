import React, { useState, useEffect, useRef } from "react";
import { useTasks } from "../../context/TaskContext";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import "./TaskItem.css";

interface TaskProps {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  category: string;
  viewType: "list" | "board";
}

const TaskItem: React.FC<TaskProps> = ({ id, title, description, dueDate, status, category, viewType }) => {
  const { updateTask, deleteTask, tasks, setEditingTask } = useTasks();
  const [taskStatus, setTaskStatus] = useState(status);
  const [showMenu, setShowMenu] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowStatusDropdown(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updatedTask = tasks.find((task) => task.id === id);
    if (updatedTask) {
      setTaskStatus(updatedTask.status);
    }
  }, [tasks]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  const handleStatusChange = (newStatus: string) => {
    updateTask(id, { status: newStatus });
    setTaskStatus(newStatus);
    setShowStatusDropdown(false);
  };

  const handleEditClick = () => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditingTask(taskToEdit); 
      setShowMenu(false);
    }
  };

  return (
    <div className={viewType === "board" ? "task-card-board" : "task-item"}>
      {viewType === "list" ? (
        <>
          <input type="checkbox" className="task-checkbox" />
          <FaCheckCircle className={`task-check-icon ${taskStatus === "COMPLETED" ? "completed-check" : ""}`} />
          <div className={`task-title ${taskStatus === "COMPLETED" ? "task-completed" : ""}`}>{title}</div>
          <div className="task-date">{formatDate(dueDate)}</div>

          <div className="task-status" ref={dropdownRef}>
            <span onClick={() => setShowStatusDropdown(!showStatusDropdown)} className={`status-badge ${taskStatus.toLowerCase()}`}>
              {taskStatus}
            </span>
            {showStatusDropdown && (
              <div className="status-dropdown">
                <div onClick={() => handleStatusChange("TO-DO")}>TO-DO</div>
                <div onClick={() => handleStatusChange("IN-PROGRESS")}>IN-PROGRESS</div>
                <div onClick={() => handleStatusChange("COMPLETED")}>COMPLETED</div>
              </div>
            )}
          </div>

          <div className="task-category">{category}</div>

          <div className="task-menu" ref={menuRef}>
            <FaEllipsisV className="menu-icon" onClick={() => setShowMenu(!showMenu)} />
            {showMenu && (
              <div className="menu-dropdown">
                <div className="menu-item" onClick={handleEditClick}>Edit</div>
                <div className="menu-item delete" onClick={() => deleteTask(id)}>Delete</div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="task-header">
            <span className="task-title">{title}</span>
            <FaEllipsisV className="menu-icon" onClick={() => setShowMenu(!showMenu)} />
          </div>

          <div className="task-footer">
            <span className="task-category">{category}</span>
            <span className="task-due">{formatDate(dueDate)}</span>
          </div>

          {showMenu && (
            <div className="menu-dropdown">
              <div className="menu-item" onClick={handleEditClick}>Edit</div>
              <div className="menu-item delete" onClick={() => deleteTask(id)}>Delete</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskItem;
