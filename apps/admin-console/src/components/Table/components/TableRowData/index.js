import React, { useState } from 'react';
import './style.css';

export default function TableRowData(props) {
	const [isHover, setIsHover] = useState(false);
	const cls = 'table__row' + (isHover ? ' hover' : '');

	return (
		<div className={cls}>
			{props.headers.map((header) => (
				<div
					key={header.name}
					className="table__cell"
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
				>
					{props.row[header.field] || '-'}
				</div>
			))}
		</div>
	);
}
