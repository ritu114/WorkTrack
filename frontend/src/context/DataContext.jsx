import React, { createContext, useContext, useState } from 'react';
import { usersModel, projectsModel, tasksModel, notificationsModel, monthlyProductivityModel, weeklyProductivityModel } from '../data/mockData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState(usersModel);
  const [projects, setProjects] = useState(projectsModel);
  const [tasks, setTasks] = useState(tasksModel);
  const [notifications, setNotifications] = useState(notificationsModel);
  
  // Exposing fixed chart data
  const [monthlyData] = useState(monthlyProductivityModel);
  const [weeklyData] = useState(weeklyProductivityModel);

  const addTask = (task) => {
    const newTask = { ...task, id: `TSK-${Math.floor(Math.random() * 1000)}` };
    setTasks([...tasks, newTask]);
    
    // Auto-notify the assigned employee
    addNotification({
      userId: newTask.assignee,
      message: `You were assigned a new task: "${newTask.title}"`,
      type: 'assignment'
    });
  };

  const updateTaskStatus = (taskId, newStatus, managerId = null) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    
    // Notify manager if updated by employee
    const task = tasks.find(t => t.id === taskId);
    if (task && managerId) {
      const emp = users.find(u => u.id === task.assignee);
      addNotification({
        userId: managerId,
        message: `${emp.name} updated task "${task.title}" to ${newStatus}.`,
        type: 'update'
      });
    }
  };

  const addNotification = (notif) => {
    const newNotif = { 
      ...notif, 
      id: `NOTIF-${Math.floor(Math.random() * 10000)}`, 
      read: false, 
      date: new Date().toISOString().split('T')[0] 
    };
    setNotifications([newNotif, ...notifications]);
  };

  const markNotificationsRead = (userId) => {
    setNotifications(notifications.map(n => n.userId === userId ? { ...n, read: true } : n));
  };

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: `PRJ-${Math.floor(Math.random() * 1000) + 200}`, // random ID
      progress: 0,
      status: 'Pending',
      members: []
    };
    setProjects([...projects, newProject]);
  };

  return (
    <DataContext.Provider value={{
      users, projects, tasks, notifications, monthlyData, weeklyData,
      addTask, updateTaskStatus, markNotificationsRead, addProject
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
