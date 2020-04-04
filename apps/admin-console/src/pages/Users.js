import React from 'react';
import './Users.css';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Table from '../components/Table';
import Spinner from '../components/Spinner';
import Notification from '../components/Notification';

import { useAuth } from '../utils/auth';

const ALL_ADMINS = gql`
	query GetAllAdmins {
		users(role: ADMIN) {
			data {
				id
				email
			}
			total
			hasMore
		}
	}
`;

const HEADERS = [
	{ name: 'ID', field: 'id' },
	{ name: 'Email', field: 'email' },
];

export default function Users() {
	const [state] = useAuth();
	const { loading, error, data } = useQuery(ALL_ADMINS);

	if (!state.token) {
		return <Redirect to="/" />;
	}

	if (loading) {
		return (
			<section className="users">
				<h1>Users</h1>
				<Spinner active={loading}></Spinner>
			</section>
		);
	}

	if (error) {
		return (
			<section className="users">
				<h1>Users</h1>
				<div className="users__content"></div>
				<Notification show>
					<span>{error && error.message}</span>
				</Notification>
			</section>
		);
	}

	return (
		<section className="users">
			<h1>Users</h1>
			<div className="users__content">
				<Table headers={HEADERS} rows={data.users.data}></Table>
			</div>
		</section>
	);
}
