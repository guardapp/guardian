import React, { useState } from 'react';
import './style.css';

import SortIcon from '../SortIcon';
import SearchIcon from '../SearchIcon';

export default function TableCellHeader(props) {
	const [asc, setDirection] = useState(undefined);
	const dir = props.active ? asc : undefined;
	return (
		<div className="table__cell table__cell--header">
			<div>{props.header.name}</div>
			<div className="table__actions">
				<SearchIcon
					onSearch={(term) => props.onSearch({ type: 'SEARCH', term, field: props.header.field })}
					onEnter={(term) =>
						props.onAddFilter({ type: 'ADD_FILTER', term, field: props.header.field })
					}
					onReset={props.onReset}
				/>
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
