import React from 'react';
import './Settings.css';
import { Redirect } from 'react-router-dom';

import { useAuth, ACTIONS } from '../utils/auth';

export default function Users() {
	const [state, dispatch] = useAuth();
	if (!state.token) {
		return <Redirect to="/" />;
	}
	return (
		<section className="settings">
			<h2>Settings</h2>
			<button onClick={() => dispatch({ type: ACTIONS.LOGOUT })}>Logout</button>
		</section>
	);
}
