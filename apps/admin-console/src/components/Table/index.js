import React, { useReducer } from 'react';
import './style.css';

import TableRowHeader from './components/TableRowHeader';
import TableRowData from './components/TableRowData';

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
			{state.rows.map((row) => (
				<TableRowData key={row.id} row={row} headers={props.headers}></TableRowData>
			))}
		</div>
	);
}
