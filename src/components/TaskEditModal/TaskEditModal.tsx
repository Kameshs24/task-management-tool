import React, { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { FaTimes } from "react-icons/fa";
import "./TaskEditModal.css";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  category: string;
  activityLog?: { action: string; timestamp: string }[];
  attachments?: string[]; 
}

interface TaskEditModalProps {
  task: Task;
  onClose: () => void;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({ task, onClose }) => {
  const { updateTask } = useTasks();
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    updateTask(task.id, editedTask);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
       
        <div className="modal-header">
          <h2>Edit Task</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <div className="modal-content">
          
          <div className="modal-left">
            <input type="text" name="title" value={editedTask.title} onChange={handleChange} className="task-title-input" />

            <textarea name="description" value={editedTask.description} onChange={handleChange} className="task-description"></textarea>

            
            <div className="task-details">
              <div className="task-category">
                <label>Task Category*</label>
                <div className="category-buttons">
                  <button className={editedTask.category === "Work" ? "active" : ""} onClick={() => setEditedTask({ ...editedTask, category: "Work" })}>Work</button>
                  <button className={editedTask.category === "Personal" ? "active" : ""} onClick={() => setEditedTask({ ...editedTask, category: "Personal" })}>Personal</button>
                </div>
              </div>

              <div className="task-due-date">
                <label>Due on*</label>
                <input type="date" name="dueDate" value={editedTask.dueDate} onChange={handleChange} />
              </div>

              <div className="task-status">
                <label>Task Status*</label>
                <select name="status" value={editedTask.status} onChange={handleChange}>
                  <option value="todo">TO-DO</option>
                  <option value="in-progress">IN-PROGRESS</option>
                  <option value="completed">COMPLETED</option>
                </select>
              </div>
            </div>

            
            <div className="task-attachment">
              <label>Attachment</label>
              <div className="file-upload">Drop your files here to <span>Upload</span></div>
              {editedTask.attachments && editedTask.attachments.length > 0 && (
                <div className="attached-files">
                  {editedTask.attachments.map((file, index) => (
                    <div key={index} className="file-preview">
                      <img src={file} alt="attachment" />
                      <button className="remove-file" onClick={() => setEditedTask({ ...editedTask, attachments: editedTask.attachments?.filter((_, i) => i !== index) })}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          
          <div className="modal-right">
            <p>Activity</p>
            <div className="activity-log">
              {task.activityLog?.map((log, index) => (
                <div key={index} className="activity-item">
                  <span>{log.action}</span>
                  <span className="timestamp">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div className="modal-footer">
          <button onClick={onClose} className="cancel-btn">Cancel</button>
          <button onClick={handleSubmit} className="update-btn">Update</button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal; 