import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Table from '../../components/TableNew';
import Spinner from '../../components/Spinner';
import Notification from '../../components/Notification';

const ALL_USERS_IN_ROLE = gql`
	query GetAllAdmins($role: Role!, $offset: Int!) {
		users(role: $role, paginate: { limit: 100, offset: $offset }) {
			id
			email
		}
	}
`;

const columns = [
	{ Header: 'Id', accessor: 'id' },
	{ Header: 'Email', accessor: 'email' },
];

export default function UserTable({ role }) {
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		setHasMore(true);
	}, [role]);

	const { loading, error, data, fetchMore } = useQuery(ALL_USERS_IN_ROLE, {
		variables: { offset: 0, role },
		notifyOnNetworkStatusChange: true,
	});

	function fetchMoreUsers() {
		fetchMore({
			variables: { offset: data.users.length, role },
			updateQuery: (prev, { fetchMoreResult }) => {
				setHasMore(false);
				if (!fetchMoreResult || !fetchMoreResult.users || fetchMoreResult.users.length === 0) {
					return prev;
				}

				setHasMore(true);
				return Object.assign({}, prev, {
					users: [...prev.users, ...fetchMoreResult.users],
				});
			},
		});
	}

	if (loading) {
		return <Spinner active={loading}></Spinner>;
	}

	if (error) {
		return (
			<Notification show>
				<span>{error && error.message}</span>
			</Notification>
		);
	}

	return (
		<Table columns={columns} data={data.users} hasMore={hasMore} fetchMore={fetchMoreUsers}></Table>
	);
}
