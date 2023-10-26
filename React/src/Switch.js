import PropTypes from 'prop-types';
import React from 'react';
import './Switch.css';


const Switch = ({id, checked, onChange}) => {
  return (
    <label className="switch">
      <input
        className="react-switch-checkbox"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label 
        className="react-switch-label" 
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`}/>
      </label>
    </label>
  );
};

Switch.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Switch;