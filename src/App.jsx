import React, { useState } from 'react';
import './App.css';
import TaskItem from "./Components/TaskItem";

function App() {
  // Main states for holding input value and both task arrays
  const [newTask, setNewTask] = useState('');
  const [myTasks, setMyTasks] = useState([
    'Writing Notes',
    'Reading Book',
    'Attending an Event'
  ]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Captures changes inside the input box
  const handleInput = (e) => {
    setNewTask(e.target.value);
  };

  // Adds a brand new task to the array
  const addTask = () => {
    if (newTask.trim() !== '') {
      setMyTasks(prevTasks => [...prevTasks, newTask.trim()]);
      setNewTask(''); // Clear out input field after adding
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  };

  // Filters out a task when deleted from the active list
  const deleteTask = (taskName) => {
    const afterDeletion = myTasks.filter(item => item !== taskName);
    setMyTasks(afterDeletion);
  };

  // Handles moving a task from pending to the completed array
  const completeTask = (taskName) => {
    // 1. Add to completed state array
    setCompletedTasks([...completedTasks, taskName]);

    // 2. Remove it from the pending active list
    const afterFiltering = myTasks.filter(item => item !== taskName);
    setMyTasks(afterFiltering);
  };

  // Quick deletion logic specifically for completed tasks list
  const deleteCompletedTask = (taskName) => {
    const afterDeletion = completedTasks.filter(item => item !== taskName);
    setCompletedTasks(afterDeletion);
  };

  return (
    <div className="main-body d-flex justify-content-center align-items-center">
      <div className="todo-list-main-div p-4">
        <h3 className="text-center mb-4">My Todo List</h3>

        {/* Input box setup with modern Bootstrap classes */}
        <div className="todo-task-input-div d-flex align-items-center gap-2 mb-4">
          <div className="form-floating w-75">
            <input
              type="text"
              className="form-control"
              id="todoInput"
              placeholder="Todo Task"
              value={newTask}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
            />
            <label htmlFor="todoInput">Todo Task</label>
          </div>
          <button
            id="addButton"
            className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
            onClick={addTask}
          >
            +
          </button>
        </div>

        {/* Pending Active Tasks */}
        <h5>To Be Completed</h5>
        <ul className="list-group mb-4">
          {myTasks.map((task, index) => (
            <TaskItem
              key={index}
              taskName={task}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          ))}
        </ul>

        <hr />

        {/* Completed Tasks Container */}
        <h5 className="mt-3">Completed Tasks</h5>
        <ul className="list-group">
          {completedTasks.map((task, index) => (
            <TaskItem
              key={index}
              taskName={task}
              deleteTask={deleteCompletedTask}
            // completeTask={null} passing nothing leaves the complete button hidden
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;