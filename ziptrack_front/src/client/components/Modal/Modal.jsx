import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const Modal = ({ changeModalState, error }) => {
	console.log(error);
	useEffect(() => {
		document.getElementsByTagName('body')[0].classList.add('open-modal');
		return () => {
			document.getElementsByTagName('body')[0].classList.remove('open-modal');
		};
	}, []);

	return createPortal(
		<div
			className="dark-bg"
			onClick={() => {
				changeModalState(false);
			}}
		>
			<div className="message">
				<h2 className="message-header">{error ? 'Failure' : 'Success'}</h2>
				<hr className={`message-line message-line-${error ? 'fail' : 'success'}`} />
				<p className="message-text">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat error dolorem dolor, earum pariatur
					modi unde saepe autem accusantium sequi quisquam deleniti explicabo et debitis ipsum temporibus,
					tempore expedita esse.
				</p>
			</div>
		</div>,
		document.getElementById('modal')
	);
};

export default Modal;
