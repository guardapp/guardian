import React from 'react';

export default function SortIcon(props) {
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
