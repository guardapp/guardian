import React, { useState } from 'react';
import './style.css';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../../utils/auth';
import UserTable from './UserTable';

const TABS = {
	Admins: 0,
	Principals: 1,
	Teachers: 2,
	Parents: 3,
};

const ROLES = {
	0: 'ADMIN',
	1: 'PRINCIPAL',
	2: 'TEACHER',
	3: 'PARENT',
};

export default function Users() {
	const [state] = useAuth();
	const [currentTab, setCurrentTab] = useState(TABS.Admins);

	if (!state.token) {
		return <Redirect to="/" />;
	}

	return (
		<section className="users">
			<h1>Users</h1>
			<div className="users__content">
				<div className="users__tabs">
					{Object.entries(TABS).map(([tab, tabVal]) => (
						<span
							key={tabVal}
							className={`users__tab ${tabVal === currentTab ? 'users__tab--active' : ''}`}
							onClick={() => setCurrentTab(tabVal)}
						>
							{tab}
						</span>
					))}
				</div>
				<UserTable role={ROLES[currentTab]}></UserTable>
			</div>
		</section>
	);
}
