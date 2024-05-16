import React, { useState } from 'react';
const Note = () => {
  const [showContainer, setShowContainer] = useState(false);
  return (
    <div>
       <button onClick={() => setShowContainer(true)}>Show Container</button>

{/* Conditional rendering of absolute container */}
{showContainer && (
  <div className="overlay">
    <div className="absolute-container">
      {/* Content of your absolute container */}
      <p>This is the absolute container.</p>
      <button onClick={() => setShowContainer(false)}>Close</button>
    </div>
  </div>
)}
      
      
    </div>
  );
};

export default Note;
