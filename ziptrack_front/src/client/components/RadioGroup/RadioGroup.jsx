import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import RadioGroupContext from './RadioGroupContext.js';

const RadioGroup = ({ name, defaultValue, label, children }) => {
	const [ checkedValue, handleChange ] = useState(defaultValue);

	useEffect(() => {
		handleChange(defaultValue)
	}, [defaultValue])

	return (
		<RadioGroupContext.Provider value={{ name, checkedValue, handleChange }}>
			<div className="radio-group">
				{label.length > 0 && <h4>{label}</h4>}
				{children}
			</div>
		</RadioGroupContext.Provider>
	);
};

export default RadioGroup;

RadioGroup.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	defaultValue: PropTypes.string || PropTypes.number,
	children: PropTypes.node.isRequired
};

RadioGroup.defaultProps = {
	label: "",
	defaultValue: "1"
}