import React from 'react';
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import Center from '../layouts/Center';
// import Row from "../layouts/Row";
// import Input from '../components/Input';

const loginFormSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.required(),
	password: yup.string().required()
});

export default function Login() {
	return (
		<main>
			<h1>Admin Console</h1>
			<Center>
				<Formik
					initialValues={{ email: '', password: '' }}
					validationSchema={loginFormSchema}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
						}, 400);
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
		</main>
	);
}
