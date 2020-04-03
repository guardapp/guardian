import React, { useState } from 'react';
import './Login.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { useAuth, ACTIONS } from '../utils/auth';

import Center from '../layouts/Center';
import Notification from '../components/Notification';

const loginFormSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.required(),
	password: yup.string().required()
});

export default function Login() {
	const [notification, notify] = useState({});
	const [_, dispatch] = useAuth();

	return (
		<main className="login">
			<h1>Admin Console</h1>
			<Center>
				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={loginFormSchema}
					onSubmit={async (values, { setSubmitting }) => {
						try {
							if (notification.show) {
								notify(false);
							}
							const response = await fetch('http://192.168.1.160:8080/login', {
								method: 'POST',
								mode: 'cors',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify(values)
							});

							const body = await response.json();
							if (body.error) {
								notify({ show: true, message: body.error });
							} else {
								dispatch({ type: ACTIONS.LOGIN, token: body.token });
								window.location = '/users';
							}
						} catch (err) {
							console.error(err);
							notify({ show: true, message: 'Connection Error!' });
						} finally {
							setSubmitting(false);
						}
					}}
				>
					{({ isSubmitting, errors, isValid }) => (
						<Form>
							<ErrorMessage className="error" name="email" component="div" />
							<Field
								type="email"
								name="email"
								className={errors && errors.email ? 'gap error' : 'gap'}
							/>
							<ErrorMessage className="error" name="password" component="div" />
							<Field
								type="password"
								name="password"
								className={errors && errors.password ? 'gap error' : 'gap'}
							/>
							<button type="submit" disabled={isSubmitting || !isValid}>
								Submit
							</button>
						</Form>
					)}
				</Formik>
			</Center>
			<Notification show={notification.show}>
				<span>{notification.message}</span>
			</Notification>
		</main>
	);
}
