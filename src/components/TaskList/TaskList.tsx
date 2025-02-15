import React, { useEffect, useState } from "react";
import { useTasks } from "../../context/TaskContext";
import TaskSection from "../TaskSection/TaskSection";
import TaskItem from "../TaskItem/TaskItem";
import TaskEditModal from "../TaskEditModal/TaskEditModal"; 
import "./TaskList.css";

const TaskList: React.FC = () => {
  const { tasks, filterCategory, filterDueDate, searchQuery, editingTask, setEditingTask } = useTasks();

  useEffect(() => {
    console.log("🔥 TaskList Re-rendered | Tasks:", tasks);
  }, [tasks]);

  const normalizeStatus = (status: string) =>
    status.trim().toLowerCase().replace("-", "");

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    todo: false,
    inprogress: false,
    completed: false,
  });

  const toggleCollapse = (section: string) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory = !filterCategory || task.category === filterCategory;
    const matchesDueDate = !filterDueDate || task.dueDate === filterDueDate;
    const matchesSearch = !searchQuery || task.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDueDate && matchesSearch;
  });

  const groupedTasks = {
    todo: filteredTasks.filter((task) => normalizeStatus(task.status) === "todo"),
    inprogress: filteredTasks.filter((task) => normalizeStatus(task.status) === "inprogress"),
    completed: filteredTasks.filter((task) => normalizeStatus(task.status) === "completed"),
  };

  return (
    <div className="task-list">
      <TaskSection
        title="To-Do"
        color="#E6A8FC"
        count={groupedTasks.todo.length}
        collapsed={collapsedSections.todo}
        onToggle={() => toggleCollapse("todo")}
      >
        {groupedTasks.todo.map((task) => (
          <TaskItem key={task.id} {...task} viewType="list" />
        ))}
      </TaskSection>

      <TaskSection
        title="In-Progress"
        color="#9ADBF5"
        count={groupedTasks.inprogress.length}
        collapsed={collapsedSections.inprogress}
        onToggle={() => toggleCollapse("inprogress")}
      >
        {groupedTasks.inprogress.map((task) => (
          <TaskItem key={task.id} {...task} viewType="list" />
        ))}
      </TaskSection>

      <TaskSection
        title="Completed"
        color="#C9F9C9"
        count={groupedTasks.completed.length}
        collapsed={collapsedSections.completed}
        onToggle={() => toggleCollapse("completed")}
      >
        {groupedTasks.completed.map((task) => (
          <TaskItem key={task.id} {...task} viewType="list" />
        ))}
      </TaskSection>

     
      {editingTask && (
        <TaskEditModal task={editingTask} onClose={() => setEditingTask(null)} />
      )}
    </div>
  );
};

export default TaskList;
