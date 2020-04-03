import { useReducer } from 'react';

export const ACTIONS = {
	LOGIN: 'LOGIN'
};

function reducer(state, action) {
	console.log(state, action);

	switch (action.type) {
		case ACTIONS.LOGIN:
			window.localStorage.setItem('token', action.token);
			return { token: action.token };
		default:
			throw new Error(`no such action "${action.type}"`);
	}
}

export function useAuth() {
	const token = window.localStorage.getItem('token');
	return useReducer(reducer, { token });
}
