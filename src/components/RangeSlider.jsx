import React, { useState } from 'react';

function RangeSlider({ 
  id,
  title, 
  min, 
  max, 
  defaultValue, 
  valueFormat
}) {
  const [value, setValue] = useState(defaultValue);
  
  const handleChange = (e) => {
    setValue(parseInt(e.target.value));
  };
  
  return (
    <div className="slider-container">
      <h4>{title}: <span className="range-value">{valueFormat(value)}</span></h4>
      <input 
        type="range" 
        id={id}
        min={min} 
        max={max} 
        value={value}
        className="range-slider" 
        onChange={handleChange}
      />
    </div>
  );
}

export default RangeSlider;