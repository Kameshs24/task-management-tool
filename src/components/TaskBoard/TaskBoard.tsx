import React from "react";
import { useTasks } from "../../context/TaskContext";
import TaskItem from "../TaskItem/TaskItem";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./TaskBoard.css";

const TaskBoard: React.FC = () => {
  const { tasks, filterCategory, filterDueDate, searchQuery, updateTask } = useTasks();

  const filteredTasks = tasks.filter((task) => {
    return (
      (!filterCategory || task.category.toLowerCase() === filterCategory.toLowerCase()) &&
      (!filterDueDate || task.dueDate === filterDueDate) &&
      (!searchQuery || task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const groupedTasks = {
    "To-Do": filteredTasks.filter((task) => task.status.toLowerCase() === "to-do"),
    "In-Progress": filteredTasks.filter((task) => task.status.toLowerCase() === "in-progress"),
    "Completed": filteredTasks.filter((task) => task.status.toLowerCase() === "completed"),
  };

  
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const newStatus = destination.droppableId;

    if (source.droppableId !== destination.droppableId) {
      updateTask(draggableId, { status: newStatus });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-container">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="board-column">
                <h3 className={`column-header ${status.toLowerCase().replace(" ", "-")}`}>
                  {status.toUpperCase()}
                </h3>
                <div className="task-list">
                  {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskItem {...task} viewType="board" />
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div className="no-tasks">No tasks in {status}</div>
                  )}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
