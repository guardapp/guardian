import React from 'react';
import { Redirect } from 'react-router-dom';

import Table from '../components/Table';

import { useAuth } from '../utils/auth';

export default function Users() {
	const [state] = useAuth();
	if (!state.token) {
		return <Redirect to="/" />;
	}
	return (
		<section>
			<h1>Users</h1>
			<Table></Table>
		</section>
	);
}
