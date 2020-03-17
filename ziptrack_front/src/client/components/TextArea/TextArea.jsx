import React, { useState, useEffect } from 'react';
import './TextArea.scss';

const TextArea = ({defaultValue,onChange}) => {
	const [ text, chageText ] = useState(defaultValue);
	
	useEffect(() => {
		onChange(text)
	}, [text,onChange])

    const handleChange = ({target:{value}}) => {
        chageText(value)
    }

	return (
		<div className="text-area">
			<h4>Notes</h4>
			<textarea name="Notes" cols="30" rows="10" placeholder="Notes" value={text} onChange={handleChange}/>
		</div>
	);
};

export default TextArea;
