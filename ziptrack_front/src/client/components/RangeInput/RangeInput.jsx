import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./RangeInput.scss";

const RangeInput = ({
  label,
  min,
  max,
  step,
  defaultValue,
  showCurrentValue,
  onChange
}) => {
  const [currentValue, setCurrentValue] = useState(
    defaultValue || (max - min) / 2
  );

  useEffect(() => {
    onChange(currentValue);
  }, [currentValue]);

  const handleRangeChange = ({ target: { value } }) => {
    setCurrentValue(+value);
    onChange(+value);
  };

  const handleIncreaseBtnClick = e => {
    e.preventDefault();
    const newValue = currentValue + step;
    if (newValue <= max) setCurrentValue(+newValue);
  };

  const handleDecreaseBtnClick = e => {
    e.preventDefault();
    const newValue = currentValue - step;
    if (newValue >= min) setCurrentValue(+newValue);
  };

  return (
    <div className="range">
      {label.length > 0 && <h4 className="range-heading">{label}</h4>}
      <div className="range-controls">
        <button
          className="range-controls-btn range-controls-btn-dcrs"
          onClick={handleDecreaseBtnClick}
        >
          –
        </button>
        <input
          className="range-controls-slider"
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleRangeChange}
        />
        <button
          className="range-controls-btn range-controls-btn-incr"
          onClick={handleIncreaseBtnClick}
        >
          +
        </button>
      </div>
      {showCurrentValue && (
        <span className="range-value">
          {currentValue.toFixed(Math.abs(Math.log10(step).toFixed(0)))}
        </span>
      )}
    </div>
  );
};

export default RangeInput;

RangeInput.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  defaultValue: PropTypes.number,
  showCurrentValue: PropTypes.bool,
  onChange: PropTypes.func
};

RangeInput.defaultProps = {
  label: "",
  min: 0,
  max: 100,
  step: 1,
  showCurrentValue: true
};
