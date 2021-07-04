import React from 'react';

const ColorChanger = () => {
  return (
    <div className="mg-10">
      <input type="color" />
      <span>=></span>
      <input type="color" />
      <br />
      <button>apply</button>
    </div>
  );
};

export default ColorChanger;
