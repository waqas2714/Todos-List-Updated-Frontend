import React from 'react';

const Summary = ({isLoading, tasks, completedTasks}) => {
  return (
    <div>
      {isLoading ? (
        <p>Tasks not available yet.</p>
      ) : (
        <div className="summary">
          <div className="total">
            <h4>Total Tasks:</h4>
            <p>{tasks.length}</p>
          </div>
          <div className="completed-tasks">
            <h4>Completed Tasks:</h4>
            <p>{completedTasks}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;
