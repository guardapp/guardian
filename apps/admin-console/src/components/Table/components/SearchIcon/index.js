import React, { useState, useRef } from 'react';
import './style.css';

export default function SearchIcon(props) {
	const [isOpen, setOpen] = useState(false);
	const input = useRef(null);

	const cls = 'table__search' + (isOpen ? ' table__search--open' : '');

	return (
		<span className={cls}>
			<input
				type="text"
				ref={input}
				onBlur={() => {
					setOpen(false);
					input.current.value = '';
				}}
			></input>
			<span
				className="material-icons"
				onClick={() => {
					if (!isOpen) {
						input.current.focus();
					}
					setOpen(!isOpen);
				}}
			>
				search
			</span>
		</span>
	);
}
