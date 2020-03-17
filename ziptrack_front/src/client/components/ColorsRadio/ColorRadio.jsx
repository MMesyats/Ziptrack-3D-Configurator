import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import RadioGroupContext from "../RadioGroup/RadioGroupContext.js";
import "./ColorRadio.scss";

const ColorRadio = ({ value, hexValue, callback }) => {
  const { name, checkedValue, handleChange } = useContext(RadioGroupContext);
  const [isChecked, changeChecked] = useState(checkedValue === value);

  useEffect(() => {
    changeChecked(checkedValue === hexValue);
  }, [checkedValue, hexValue]);

  return (
    <label className={`color-radio${isChecked ? "-checked" : ""}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checkedValue === value}
        onChange={({ target: { value } }) => {
          handleChange(value);
          callback(hexValue);
        }}
      />
      <div className="color-radio-block">
        <div style={{ background: hexValue }} />
      </div>
    </label>
  );
};

export default ColorRadio;

ColorRadio.propTypes = {
  value: PropTypes.any.isRequired,
  hexValue: PropTypes.string.isRequired,
  callback: PropTypes.func
};

ColorRadio.defaultProps = {
  callback: () => true
};
