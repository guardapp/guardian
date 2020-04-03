import React, { useState } from 'react';
import './style.css';

import { Link } from 'react-router-dom';

const ITEMS = [
	{ name: 'account_circle', route: '/users' },
	{ name: 'child_care', route: '/children' },
	{ name: 'school', route: '/classes' },
	{ name: 'home', route: '/kindergarten' },
	{ name: 'settings', route: '/settings' }
];

export default function SideNav() {
	const route = window.location.pathname;
	const item = ITEMS.find(item => item.route.startsWith(route));
	const idx = ITEMS.indexOf(item);
	const [activeIx, setActive] = useState(idx);

	return (
		<aside className="sidenav">
			{ITEMS.map((item, idx) => {
				const cls = ['sidenav__item', 'material-icons'];
				if (idx === activeIx) cls.push('sidenav__item--active');
				if (idx === ITEMS.length - 1) cls.push('sidenav__item--bottom');
				return (
					<Link
						to={item.route}
						key={item.name}
						onClick={() => setActive(idx)}
						className={cls.join(' ')}
					>
						{item.name}
					</Link>
				);
			})}
		</aside>
	);
}
