import React from 'react';

function TaskItem({ taskName, deleteTask, completeTask }) {
    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-center tasks-list">
                <div className="task-text w-50">
                    {taskName}
                </div>
                <div className="task-buttons d-flex gap-2">
                    {/* Complete Button */}
                    {completeTask && (
                        <button
                            className="btn btn-success btn-sm"
                            onClick={() => completeTask(taskName)}
                        >
                            Complete
                        </button>
                    )}
                    {/* Delete Button */}
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTask(taskName)}
                    >
                        Delete
                    </button>
                </div>
            </li>
        </>
    );
}

export default TaskItem;