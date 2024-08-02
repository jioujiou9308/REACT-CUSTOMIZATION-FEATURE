import React, { useState } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Initial text');
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState([]);
  const [color, setColor] = useState('#3498db');

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleToggleActive = () => {
    setIsActive(!isActive);
  };

  const handleAddData = () => {
    setData([...data, `New Item ${data.length + 1}`]);
  };

  const handleColorChange = () => {
    setColor(color === '#3498db' ? '#e74c3c' : '#3498db');
  };
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>

      <p>Text: {text}</p>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p>Active: {isActive ? 'Yes' : 'No'}</p>
      <button onClick={handleToggleActive}>Toggle Active</button>

      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={handleAddData}>Add Data</button>

      <div style={{ backgroundColor: color, width: '100px', height: '100px' }}>
        {/* Your content here */}
      </div>
      <button onClick={handleColorChange}>Change Color</button>
    </div>
  );
};

export default MyComponent;