import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SideNav from './components/SideNav';

import Login from './pages/Login';
import Users from './pages/Users';
import Children from './pages/Children';
import Classes from './pages/Classes';
import Kindergarten from './pages/Kindergarten';
import Settings from './pages/Settings';

function App() {
	return (
		<Router>
			<Route path="/" exact component={Login} />
			<Route
				path="/users"
				render={() => (
					<Shell>
						<Users />
					</Shell>
				)}
			/>
			<Route
				path="/children"
				render={() => (
					<Shell>
						<Children />
					</Shell>
				)}
			/>
			<Route
				path="/classes"
				render={() => (
					<Shell>
						<Classes />
					</Shell>
				)}
			/>
			<Route
				path="/kindergarten"
				render={() => (
					<Shell>
						<Kindergarten />
					</Shell>
				)}
			/>
			<Route
				path="/settings"
				render={() => (
					<Shell>
						<Settings />
					</Shell>
				)}
			/>
		</Router>
	);
}

function Shell({ children }) {
	return (
		<>
			<SideNav></SideNav>
			<main>{children}</main>
		</>
	);
}

export default App;
