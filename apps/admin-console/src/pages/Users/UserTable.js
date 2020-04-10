import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Table from '../../components/Table';
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

const HEADERS = [
	{ name: 'ID', field: 'id' },
	{ name: 'Email', field: 'email' },
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

	return (
		<Table
			headers={HEADERS}
			rows={data.users}
			hasMore={hasMore}
			onLoadMore={() =>
				fetchMore({
					variables: { offset: data.users.length },
					updateQuery: (prev, { fetchMoreResult }) => {
						if (prev.users.length > data.users.length) return prev;
						if (fetchMoreResult.users.length === 0) {
							setHasMore(false);
							return prev;
						}
						return Object.assign({}, prev, {
							users: [...prev.users, ...fetchMoreResult.users],
						});
					},
				})
			}
		></Table>
	);
}
