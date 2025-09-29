import React, { useState } from 'react';

function RangeSlider({ 
  id,
  title, 
  min, 
  max, 
  defaultValue, 
  valueFormat,
  onChange
}) {
  const [value, setValue] = useState(defaultValue);
  
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
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