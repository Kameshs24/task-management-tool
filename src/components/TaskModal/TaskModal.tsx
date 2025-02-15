import React, { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { auth } from "../../firebase";
import "./TaskModal.css";

interface TaskModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, closeModal }) => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const isFormValid = title && description && dueDate && status && category;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fill all required fields!");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to create tasks.");
      return;
    }

    try {
      await addTask({
        title,
        description,
        dueDate,
        status,
        category,
        userId: user.uid,
        file, // Add file here if you want to use it in task creation
      });

      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("");
      setCategory("");
      setFile(null);
      closeModal();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create Task</h2>
          <button className="close-btn" onClick={closeModal}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="description-container">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
              required
            />
            <div className="text-editor">
              <span><b>B</b></span> / <span><i>S</i></span> <span>☰</span>
            </div>
            <div className="char-count">{description.length}/300 characters</div>
          </div>

          <div className="form-group">
            <div className="category-section">
              <label>Task Category*</label>
              <div className="category-buttons">
                <button
                  type="button"
                  className={category === "Work" ? "active" : ""}
                  onClick={() => setCategory("Work")}
                >
                  Work
                </button>
                <button
                  type="button"
                  className={category === "Personal" ? "active" : ""}
                  onClick={() => setCategory("Personal")}
                >
                  Personal
                </button>
              </div>
            </div>

            <div className="due-date-section">
              <label>Due on*</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="status-section">
              <label>Task Status*</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="">Choose</option>
                <option value="To-Do">To-Do</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="attachment-section">
            <label>Attachment</label>
            <div className="file-upload">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                hidden
                id="file-input"
              />
              <label htmlFor="file-input" className="file-drop">
                Drop your files here or <span className="update-link">Update</span>
              </label>
              {/* Show file name if a file is selected */}
              {file && <div className="file-name">{file.name}</div>}
            </div>
          </div>

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className={`create-btn ${isFormValid ? "active" : "inactive"}`} disabled={!isFormValid}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
