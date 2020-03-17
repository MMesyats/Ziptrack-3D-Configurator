import React, { useState, useEffect } from 'react';
import './QuantityInput.scss';

const QuantityInput = ({defaultValue,onChange}) => {
	const [ quantity, changeQuantity ] = useState(defaultValue);

    useEffect(() => {
        onChange(quantity);
    }, [quantity,onChange])

    const handleDecreaseBtnClick = (e) =>
    {
        e.preventDefault();
        if(quantity>1) changeQuantity(+quantity-1);  
    }
    const handleIncreaseBtnClick = (e) =>
    {
        e.preventDefault();
        const {target:value} = e;
        if(+quantity<9999)
            changeQuantity(+quantity+1); 
    }
    const handleQuantityChange = ({target:{value}}) =>
    {
        if(!isNaN(value))
            if(+value<=9999)
                changeQuantity(value);
    }
    const handleBlurQuantity = ({target:{value}}) =>
    {
        if(isNaN(value) || value<1) changeQuantity(1);
    }
	return (
		<div className="quantity">
			<h4>Quantity</h4>
			<div className="quantity-controls">
				<button className="quantity-controls-btn quantity-controls-btn-dcrs" onClick={handleDecreaseBtnClick}>-</button>
				<input className="quantity-controls-input" type="text" value={quantity} onChange={handleQuantityChange} onBlur={handleBlurQuantity} />
				<button className="quantity-controls-btn quantity-controls-btn-incr" onClick={handleIncreaseBtnClick}>+</button>
			</div>
		</div>
	);
};

export default QuantityInput;
