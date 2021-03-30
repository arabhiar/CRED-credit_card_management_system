import React from 'react';

const Dropdown = (props) => {
  const { value, handleChange, label, data } = props;
  return (
    <select
      value={value}
      onChange={handleChange}
      className="card-input__input -select"
      required
    >
      <option hidden>{label}</option>
      {data.map((val, idx) => (
        <option key={idx} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
