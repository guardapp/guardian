import React, { useState } from 'react';

import TableCellHeader from './TableCellHeader';

export default function TableRowHeader(props) {
	const [colSortActive, setColSortActive] = useState(null);
	return props.headers.map((header, idx) => {
		return (
			<TableCellHeader
				key={header.name}
				active={idx === colSortActive}
				header={header}
				onSort={(e) => {
					setColSortActive(idx);
					props.onSort(e);
				}}
			></TableCellHeader>
		);
	});
}
