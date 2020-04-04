import React from 'react';
import './style.css';

export default function Notification(props) {
	return props.show ? <div className="notification">{props.children}</div> : null;
}
