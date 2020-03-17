import React, { useState, useContext, useEffect } from 'react';
import ColorPicker from 'coloreact';
import RadioGroupContext from '../RadioGroup/RadioGroupContext.js';
import './ColorPickerRadio.scss';

const ColorPickerRadio = () => {
	const [ color, setColor ] = useState('#000000');
	const { name, checkedValue, handleChange } = useContext(RadioGroupContext);

	useEffect(
		() => {
		},
		[ checkedValue ]
	);

	return (
		<label>
			<input type="radio" />
			<div className="pop-up">
				<div className="color-picker">
					<ColorPicker opacity={false} color={color} onChange={(color) => setColor(color.hex)} />
				</div>
			</div>
		</label>
	);
};

export default ColorPickerRadio;
