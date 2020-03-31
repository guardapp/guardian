import React, { useState } from 'react';
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

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
	const [show, showNotification] = useState(false);
	return (
		<main>
			<h1>Admin Console</h1>
			<Center>
				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={loginFormSchema}
					onSubmit={async (values, { setSubmitting }) => {
						try {
							if (show) {
								showNotification(false);
							}
							const response = await fetch('http://localhost:8090/login', {
								method: 'POST',
								mode: 'cors',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify(values)
							});

							const body = await response.json();
							console.log(body);
						} catch (err) {
							console.error(err);
							showNotification(true);
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
			<Notification show={show}>
				<span>Connection Error!</span>
			</Notification>
		</main>
	);
}
