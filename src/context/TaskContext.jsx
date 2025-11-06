import React from 'react';
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//  Context object for global access
export const TaskContext = createContext();

// Provider component to wrap the entire app
export const TaskProvider = ({ children }) => 
  {
  
          const [tasks, setTasks] = useState([]);
          const [loading, setLoading] = useState(false);
          const [error, setError] = useState('');

  //  Fetch Tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=2');
        const apiTasks = response.data.map((task) => ({
          id: task.id,
          title: task.title,
          completed: task.completed,
        }));
        setTasks(apiTasks);
        localStorage.setItem('tasks', JSON.stringify(apiTasks)); // save locally
      } catch (err) {
        console.error('API fetch failed.');
        const localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(localTasks);
        setError('Failed to fetch from API, showing local tasks.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Save Tasks to LocalStorage on change 
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);
