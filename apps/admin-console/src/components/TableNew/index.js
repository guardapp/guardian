import React, { useMemo } from 'react';
import './style.css';

import { useTable, useSortBy, useFilters } from 'react-table';
import SortIcon from './SortIcon';
import SearchIcon from './SearchIcon';

export default function Table({ columns, data }) {
	columns.forEach((col) => {
		col.Filter = SearchIcon;
		col.filter = 'includes';
	});
	const cols = useMemo(() => columns, [columns]);
	const _data = useMemo(() => data, [data]);

	const { getTableProps, rows, prepareRow, headers } = useTable(
		{
			columns: cols,
			data: _data || [],
		},
		useFilters,
		useSortBy
	);

	return (
		<div
			className="table"
			style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)` }}
			{...getTableProps()}
		>
			{headers.map((column) => (
				<div className="table__cell table__cell--header">
					<div>{column.render('Header')}</div>
					<div className="table__actions">
						{column.render('Filter')}
						<SortIcon
							isSorted={column.isSorted}
							isSortedDesc={column.isSortedDesc}
							{...column.getHeaderProps(column.getSortByToggleProps())}
						></SortIcon>
					</div>
				</div>
			))}
			{rows.map((row) => {
				prepareRow(row);
				return (
					<div className="table__row" {...row.getRowProps()}>
						{row.cells.map((cell) => {
							return (
								<div className="table__cell" {...cell.getCellProps()}>
									{cell.render('Cell')}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}
