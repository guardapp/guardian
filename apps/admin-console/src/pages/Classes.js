import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../utils/auth';

export default function Users() {
	const [state] = useAuth();
	if (!state.token) {
		return <Redirect to="/" />;
	}
	return <h1>Classes</h1>;
}
