import React from 'react';
import { Redirect } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { useAuth } from '../utils/auth';

import Table from '../components/TableNew';
import Spinner from '../components/Spinner';

const ALL_USERS_IN_ROLE = gql`
	query GetAllAdmins($role: Role!, $offset: Int!) {
		users(role: $role, paginate: { limit: 10, offset: $offset }) {
			id
			email
		}
	}
`;

export default function Users() {
	const [state] = useAuth();
	const { loading, error, data } = useQuery(ALL_USERS_IN_ROLE, {
		variables: { offset: 0, role: 'ADMIN' },
		notifyOnNetworkStatusChange: true,
	});

	const columns = [
		{ Header: 'Id', accessor: 'id' },
		{ Header: 'Email', accessor: 'email' },
	];

	if (!state.token) {
		return <Redirect to="/" />;
	}

	if (loading) {
		return <Spinner active></Spinner>;
	}

	if (error) {
		return <span>{error}</span>;
	}

	return <Table columns={columns} data={data.users}></Table>;
}
