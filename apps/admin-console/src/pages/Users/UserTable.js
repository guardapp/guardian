import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Table from '../../components/TableNew';
import Spinner from '../../components/Spinner';
import Notification from '../../components/Notification';

const ALL_USERS_IN_ROLE = gql`
	query GetAllAdmins($role: Role!, $offset: Int!) {
		users(role: $role, paginate: { limit: 10, offset: $offset }) {
			id
			email
		}
	}
`;

const columns = [
	{ Header: 'Id', accessor: 'id' },
	{ Header: 'Email', accessor: 'email' },
];
// function useScrollPosition() {
// 	const [pos, setPos] = useState(window.scrollY);

// 	useLayoutEffect(() => {
// 		function setPosition() {
// 			setPos(window.scrollY);
// 		}

// 		window.addEventListener('scroll', setPosition);
// 		return () => {
// 			window.removeEventListener('scroll', setPosition);
// 		};
// 	});

// 	return [pos];
// }

export default function UserTable({ role }) {
	const [hasMore, setHasMore] = useState(true);

	const { loading, error, data, fetchMore } = useQuery(ALL_USERS_IN_ROLE, {
		variables: { offset: 0, role },
		notifyOnNetworkStatusChange: true,
	});

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

	return <Table columns={columns} data={data.users}></Table>;
}
