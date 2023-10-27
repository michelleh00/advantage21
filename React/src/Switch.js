import PropTypes from "prop-types";
import React from "react";
import "./Switch.css";

// React switch creation for toggle buttons on the user profile (Account.js) page
// Switch is designed for multiple uses
const Switch = ({ id, checked, onChange }) => {
  return (
    <label className="switch">
      <input
        className="react-switch-checkbox"
        // unique identifier for each switch created
        id={id}
        type="checkbox"
        // check state of checkbox
        checked={checked}
        onChange={onChange}
      />
      <label className="react-switch-label" htmlFor={id}>
        <span className={`react-switch-button`} />
      </label>
    </label>
  );
};

// define prop types for switch
Switch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Switch;
