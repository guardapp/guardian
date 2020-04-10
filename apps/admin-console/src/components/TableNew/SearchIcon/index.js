import React, { useState, useRef } from 'react';
import './style.css';

export default function SearchIcon({ column }) {
	const [isOpen, setOpen] = useState(false);
	const input = useRef(null);
	const onChange = (e) => {
		column.setFilter(e.target.value);
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
				}}
				onChange={onChange}
				value={column.filterValue || ''}
			></input>
			<span
				className="material-icons table__clear"
				onClick={() => {
					column.setFilter(null);
					setOpen(false);
				}}
			>
				{column.filterValue ? 'delete' : ''}
			</span>
			<span
				className="table__filter"
				onClick={() => {
					if (!isOpen) setOpen(true);
				}}
			>
				{column.filterValue ? `[${column.filterValue}]` : ''}
			</span>
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
