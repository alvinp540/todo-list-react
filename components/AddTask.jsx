
import React, { useContext, useState } from 'react';
import { TaskContext } from '../src/context/TaskContext';
import { toast } from 'react-hot-toast';


export const AddTask = () => {
  const { addTask } = useContext(TaskContext);
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim() === '') {
      toast.error('Please enter a task !');
      return;
    }
    addTask(taskTitle);
    toast.success('Task added successfully!');
    setTaskTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-5">
      <input
        type="text"
        placeholder="Enter new task..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="border p-2 rounded-l-lg "
      />
      <button type="submit" className="">
        Add
      </button>
    </form>
  );
};
