import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../firebase";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  category: string;
  userId: string;
  fileUrl?: string | null;
  attachments?: string[];
  activityLog?: { action: string; timestamp: string }[];
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTask: (id: string, updatedTask: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  filterCategory: string;
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
  filterDueDate: string;
  setFilterDueDate: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  editingTask: Task | null; 
  setEditingTask: React.Dispatch<React.SetStateAction<Task | null>>; 
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDueDate, setFilterDueDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null); 

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        setTasks([]);
        return;
      }

      const userTasksQuery = query(collection(db, "tasks"), where("userId", "==", user.uid));
      const unsubscribeFirestore = onSnapshot(userTasksQuery, (snapshot) => {
        const taskList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Task, "id">),
        }));
        setTasks(taskList);
      });

      return () => unsubscribeFirestore();
    });

    return () => unsubscribeAuth();
  }, []);

  
  const addTask = async (task: Omit<Task, "id">) => {
    const user = auth.currentUser;
    if (!user) return;

    const newTask = { ...task, userId: user.uid };
    await addDoc(collection(db, "tasks"), newTask);
  };

  
  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, updatedTask);
  };

  
  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        filterCategory,
        setFilterCategory,
        filterDueDate,
        setFilterDueDate,
        searchQuery,
        setSearchQuery,
        selectedTask,
        setSelectedTask,
        editingTask, 
        setEditingTask, 
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};
