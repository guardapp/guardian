import React, { useState, useRef } from 'react';
import './style.css';

import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

export default function SearchIcon(props) {
	const [isOpen, setOpen] = useState(false);
	const input = useRef(null);
	const search = useRef(debounce((term) => props.onSearch(term), 500)).current;
	const enter = useRef(throttle((term) => props.onEnter(term), 100)).current;
	const onChange = (e) => {
		search(e.target.value);
	};

	const cls = 'table__search' + (isOpen ? ' table__search--open' : '');

	return (
		<span className={cls}>
			<input
				type="text"
				ref={input}
				onBlur={() => {
					setOpen(false);
					input.current.value = '';
					props.onReset();
				}}
				onChange={onChange}
				onKeyPressCapture={(e) => e.key === 'Enter' && enter(e.target.value)}
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
