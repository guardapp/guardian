import React, { useReducer, useState } from 'react';
import './style.css';

function sort(data, sortBy, isASC) {
	return data.sort((r1, r2) => {
		if (r1[sortBy] < r2[sortBy]) return isASC ? -1 : 1;
		if (r1[sortBy] > r2[sortBy]) return isASC ? 1 : -1;
		return 0;
	});
}

function reducer(state, action) {
	switch (action.type) {
		case 'SORT':
			return { rows: sort(state.rows, action.field, action.dir) };
		default:
			return state;
	}
}

export default function Table(props) {
	const initial = { rows: props.rows };
	const [state, dispatch] = useReducer(reducer, initial);
	return (
		<div className="table" style={{ gridTemplateColumns: `repeat(${props.headers.length}, 1fr)` }}>
			{props.headers && <TableRowHeader headers={props.headers} onSort={dispatch}></TableRowHeader>}
			{state.rows.map(row => (
				<TableRowData key={row.id} row={row} headers={props.headers}></TableRowData>
			))}
		</div>
	);
}

function SortIcon(props) {
	if (typeof props.dir === 'undefined')
		return (
			//
			<span className="material-icons" onClick={props.onClick}>
				sort
			</span>
		);
	if (props.dir) {
		return (
			<span className="material-icons" onClick={props.onClick}>
				arrow_downward
			</span>
		);
	} else {
		return (
			<span className="material-icons" onClick={props.onClick}>
				arrow_upward
			</span>
		);
	}
}

function TableCellHeader(props) {
	const [asc, setDirection] = useState(undefined);
	const dir = props.active ? asc : undefined;
	return (
		<div className="table__cell table__cell--header">
			<div>{props.header.name}</div>
			<div className="table__actions">
				<span className="material-icons">search</span>
				<SortIcon
					dir={dir}
					onClick={() => {
						setDirection(!asc);
						props.onSort({ type: 'SORT', field: props.header.field, dir });
					}}
				></SortIcon>
			</div>
		</div>
	);
}

function TableRowHeader(props) {
	const [colSortActive, setColSortActive] = useState(null);
	return props.headers.map((header, idx) => {
		return (
			<TableCellHeader
				key={header.name}
				active={idx === colSortActive}
				header={header}
				onSort={e => {
					setColSortActive(idx);
					props.onSort(e);
				}}
			></TableCellHeader>
		);
	});
}

function TableRowData(props) {
	const [isHover, setIsHover] = useState(false);
	const cls = 'table__cell' + (isHover ? ' hover' : '');

	return props.headers.map(header => (
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
