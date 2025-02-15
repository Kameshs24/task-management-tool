import React, { useEffect, useState } from "react";
import { signInWithGoogle, auth } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import logo_1 from "./assets/logo_1.png";
import google from "./assets/google.png";
import TaskListView from "./pages/TaskListView/TaskListView";
import TaskBoardView from "./pages/TaskBoardView/TaskBoardView"; // Board View

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate(window.location.pathname === "/board" ? "/board" : "/tasks");
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    if (!user) {
      try {
        await signInWithGoogle();
        navigate("/tasks");
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/tasks" />
          ) : (
            <div className="home-container">
              <div className="logo-title">
                <img src={logo_1} alt="TaskBuddy Logo" className="logo" />
                <h1>TaskBuddy</h1>
              </div>
              <p>Streamline your workflow and track progress effortlessly with our all-in-one task management app.</p>
              <button className="google-btn" onClick={handleLogin}>
                <img src={google} alt="Google icon" className="google-icon" />
                Continue with Google
              </button>
            </div>
          )
        }
      />
      <Route path="/tasks" element={user ? <TaskListView /> : <Navigate to="/" />} />
      <Route path="/board" element={user ? <TaskBoardView /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default App;
