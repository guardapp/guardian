import React, { useState } from 'react';
import './style.css';

export default function SearchIcon(props) {
	const [isOpen, setOpen] = useState(false);

	const cls = 'table__search' + (isOpen ? ' table__search--open' : '');

	return (
		<span className={cls}>
			<input className="table__search" type="text"></input>
			<span className="material-icons" onClick={() => setOpen(!isOpen)}>
				search
			</span>
		</span>
	);
}
