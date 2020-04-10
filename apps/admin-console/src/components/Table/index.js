import React, { useReducer } from 'react';
import './style.css';
import { useInView } from 'react-intersection-observer';

import TableRowHeader from './components/TableRowHeader';
import TableRowData from './components/TableRowData';

function isNumber(num) {
	const val = Number.parseInt(num);
	return !Number.isNaN(val);
}

function sort(data, sortBy, isASC) {
	return data.sort((r1, r2) => {
		let val1 = r1[sortBy];
		let val2 = r2[sortBy];
		if (isNumber(val1) && isNumber(val2)) {
			val1 = +val1;
			val2 = +val2;
		}
		if (val1 < val2) return isASC ? -1 : 1;
		if (val1 > val2) return isASC ? 1 : -1;
		return 0;
	});
}

function search(data, by, term) {
	if (!term) return data;
	return data.filter((row) => row[by].toLowerCase().startsWith(term.toLowerCase()));
}

function reset(data) {
	return { rows: data, filters: [] };
}

function addFilter(currentFilters, filter) {
	if (!filter.term) return currentFilters;
	if (
		currentFilters.filter((f) => f.field.toLowerCase() === filter.field.toLowerCase()).length === 0
	) {
		currentFilters.push(filter);
	}
	return currentFilters;
}

function removeFilter(currentFilters, filter) {
	if (!filter) return currentFilters;
	for (let i = 0; i < currentFilters.length; i++) {
		if (currentFilters[i].field.toLowerCase() === filter.toLowerCase()) {
			currentFilters.splice(i, 1);
		}
	}
	return currentFilters;
}

function reducer(state, action) {
	switch (action.type) {
		case 'SORT':
			return { rows: sort(state.rows, action.field, action.dir), filters: state.filters };
		case 'SEARCH':
			return { rows: search(state.rows, action.field, action.term), filters: state.filters };
		case 'RESET':
			const newState = reset(action.rows);
			newState.filters = state.filters;
			if (newState.filters.length > 0) {
				for (let filter of newState.filters) {
					newState.rows = search(newState.rows, filter.field, filter.term);
				}
			}
			return newState;
		case 'ADD_FILTER':
			return {
				rows: search(state.rows, action.field, action.term),
				filters: addFilter(state.filters, action),
			};
		case 'REMOVE_FILTER':
			const _newState = reset(action.rows);
			_newState.filters = removeFilter(state.filters, action.field);
			if (_newState.filters.length > 0) {
				for (let filter of _newState.filters) {
					_newState.rows = search(_newState.rows, filter.field, filter.term);
				}
			}
			return _newState;
		default:
			return state;
	}
}

export default function Table(props) {
	const [state, dispatch] = useReducer(reducer, props.rows, reset);
	const [ref, inView] = useInView();
	if (inView && props.hasMore) {
		props.onLoadMore();
	}

	return (
		<>
			<div className="table__filters">
				{state.filters.map((filter) => (
					<div key={filter.field} className="table__filter">
						<span className="table__filter__term">{filter.term}</span>
						<span className="table__filter__field">[{filter.field}]</span>
						<span
							className="table__filter__delete material-icons"
							onClick={() =>
								dispatch({ type: 'REMOVE_FILTER', rows: props.rows, field: filter.field })
							}
						>
							delete
						</span>
					</div>
				))}
			</div>
			<div
				className="table"
				style={{ gridTemplateColumns: `repeat(${props.headers.length}, 1fr)` }}
			>
				{props.headers && (
					<TableRowHeader
						headers={props.headers}
						onSort={dispatch}
						onSearch={dispatch}
						onAddFilter={dispatch}
						onReset={() => dispatch({ type: 'RESET', rows: props.rows })}
					></TableRowHeader>
				)}
				{state.rows.map((row) => (
					<TableRowData key={row.id} row={row} headers={props.headers}></TableRowData>
				))}
				<div className="table__end" ref={ref}></div>
			</div>
		</>
	);
}
