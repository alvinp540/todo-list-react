

import React, { useContext, useState } from 'react';
import { TaskContext } from '../src/context/TaskContext';


export const TaskList = () => {
  const { tasks, loading, error, updateTaskStatus, editTask, deleteTask } = useContext(TaskContext);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  
// activates edit mode for a specific task
  const handleEdit = (task) => {
        setEditingTaskId(task.id);
        setEditedTitle(task.title);
    };



//calls  context’s editTask() to save the new title, then exits edit mode.
  const handleSaveEdit = (taskId) => {
    if (editedTitle.trim() !== '') {
      editTask(taskId, editedTitle);
      setEditingTaskId(null);
      setEditedTitle('');
    }
  };

  // Filters the tasks array based on the selected filter
  const filteredTasks = tasks.filter((task) => {
  if (filter === 'completed') return task.completed;
  if (filter === 'pending') return !task.completed;
  return true;
});


};
