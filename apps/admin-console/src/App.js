import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SideNav from './components/SideNav';

import Login from './pages/Login';
import Users from './pages/Users';
import Children from './pages/Children';
import Classes from './pages/Classes';
import Kindergarten from './pages/Kindergarten';
import Settings from './pages/Settings';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';

import { useAuth } from './utils/auth';

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData,
});
const cache = new InMemoryCache({ fragmentMatcher });

function App() {
	const [{ token }] = useAuth();

	const client = new ApolloClient({
		cache,
		uri: `${window.BACKEND}/graphql`,
		fetchOptions: {
			mode: 'cors',
		},
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return (
		<ApolloProvider client={client}>
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
		</ApolloProvider>
	);
}

function Shell({ children }) {
	return (
		<>
			<SideNav></SideNav>
			<main className="main">
				<h1 className="title">Admin Console</h1>
				{children}
			</main>
		</>
	);
}

export default App;
