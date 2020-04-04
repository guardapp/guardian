import React, { useState } from 'react';
import './style.css';

export default function TableRowData(props) {
	const [isHover, setIsHover] = useState(false);
	const cls = 'table__cell' + (isHover ? ' hover' : '');

	return props.headers.map((header) => (
		<div
			key={header.name}
			className={cls}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			{props.row[header.field] || '-'}
		</div>
	));
}
