import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FaList, FaTh, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { auth } from "../../firebase";
import TaskModal from "../TaskModal/TaskModal";
import task_icon from "../../assets/task_icon.png";
import { useTasks } from "../../context/TaskContext"; 
import "./Header.css";

const Header: React.FC = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    tasks,
    filterCategory,
    setFilterCategory,
    filterDueDate,
    setFilterDueDate,
    searchQuery,
    setSearchQuery,
  } = useTasks();

  
  const uniqueDueDates = Array.from(
    new Set(
      tasks
        .filter((task) => !filterCategory || task.category === filterCategory)
        .map((task) => task.dueDate)
    )
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <img src={task_icon} alt="TaskBuddy Logo" />
            <p>TaskBuddy</p>
          </div>

          <nav className="view-switch">
            <span
              className={location.pathname === "/tasks" ? "active" : ""}
              onClick={() => navigate("/tasks")}
            >
              <FaList /> List
            </span>
            <span
              className={location.pathname === "/board" ? "active" : ""}
              onClick={() => navigate("/board")}
            >
              <FaTh /> Board
            </span>
          </nav>

          
          <div className="filters">
            <span>Filter by:</span>
            <div className="filter-options">
              
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setFilterDueDate(""); 
                }}
              >
                <option value="">All Categories</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
              </select>

              
              <select value={filterDueDate} onChange={(e) => setFilterDueDate(e.target.value)}>
                <option value="">All Dates</option>
                {uniqueDueDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        
        <div className="header-right">
          <div
            className="user-profile-container"
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setTimeout(() => setShowLogout(false), 700)}
          >
            <div className="user-profile">
              {user && (
                <>
                  <img
                    src={user.photoURL || "https://via.placeholder.com/30"}
                    alt="User"
                    className="user-img"
                  />
                  <span className="user-name">{user.displayName || "User"}</span>
                </>
              )}
            </div>

            {showLogout && (
              <button
                className="logout-btn"
                onClick={handleLogout}
                onMouseEnter={() => setShowLogout(true)}
                onMouseLeave={() => setShowLogout(false)}
              >
                <FaSignOutAlt /> Logout
              </button>
            )}
          </div>

          <div className="search-add-container">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
            </div>
            <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
              ADD TASK
            </button>
          </div>
        </div>
      </header>

      {isModalOpen && <TaskModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Header;
