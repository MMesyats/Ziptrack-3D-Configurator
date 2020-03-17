import React, { useState ,useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RadioGroupContext from '../RadioGroup/RadioGroupContext.js';
import './Radio.scss';

const Radio = ({ label, value, callback }) => {
	const { name, checkedValue, handleChange } = useContext(RadioGroupContext);
	const [isChecked,changeChecked] = useState(checkedValue===value)

	useEffect(() => {
		changeChecked(checkedValue===value)
	}, [checkedValue,value])

	return (
		<label className={`radio-button${isChecked?'-checked':''}`} >
			<input
				type="radio"
				name={name}
				value={value}
				onChange={({ target: { value } }) => {
					handleChange(value);
					callback(value);
				}}
				checked={isChecked}
			/>
			<span>{label}</span>
		</label>
	);
};

export default Radio;

Radio.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.any.isRequired,
	callback: PropTypes.func
};

Radio.defaultProps = {
	callback: () => true
};
