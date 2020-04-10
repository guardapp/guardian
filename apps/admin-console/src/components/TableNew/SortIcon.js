import React from 'react';

export default function SortIcon({ isSorted, isSortedDesc, ...other }) {
	if (!isSorted)
		return (
			<span className="material-icons" {...other}>
				sort
			</span>
		);

	if (isSortedDesc) {
		return (
			<span className="material-icons" {...other}>
				arrow_downward
			</span>
		);
	} else {
		return (
			<span className="material-icons" {...other}>
				arrow_upward
			</span>
		);
	}
}
