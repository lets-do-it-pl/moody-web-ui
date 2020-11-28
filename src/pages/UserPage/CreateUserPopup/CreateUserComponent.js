import React from 'react'
import { Field, Formik } from "formik";
import * as Yup from "yup";
import "./formStyle.scss";


const initialValues = {
	userName: '',
	password: '',
	isActive: '',
	userType: '',
	firstName: '',
	lastName: '',
	email: '',
};

const validationSchema = Yup.object({
	userName: Yup.string()
		.min(4, "Mininum 2 characters")
		.max(10, "Maximum 15 characters")
		.required("Username is required"),
	password: Yup.string()
		.min(6, 'Password has to be longer than 6 characters!')
		.required('Password is required!'),
	isActive: Yup.bool()
		.required("Is Active option is required"),
	userType: Yup
		.string()
		.oneOf(['Admin', 'Standard'])
		.required('Please indicate your userType'),
	firstName: Yup.string()
		.required("Firstname is required"),
	lastName: Yup.string()
		.required("Lastname is required"),
	email: Yup.string()
		.email('Invalid email')
		.required('Email is required'),
});

const CreateUserComponent = ({ onSubmit }) => {

	return (

		<Formik
			initialValues={initialValues}
			validate={validationSchema}
			onSubmit={onSubmit}
		>

			{(formik) => {
				const {
					values,
					handleChange,
					handleSubmit,
					errors,
					touched,
					handleBlur,
					isValid,
					dirty
				} = formik;
				return (
					<div className="container">
						<h1>Create New User</h1>
						<form onSubmit={handleSubmit}>
							<div className="form-row">
								<label htmlFor="userName">Username</label>
								<input
									type="userName"
									name="userName"
									id="userName"
									value={values.userName}
									onChange={handleChange}
									onBlur={handleBlur}

								/>
								{errors.userName ? errors.userName : null} </div>

							<div className="form-row">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									name="password"
									id="password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}

								/>
								{errors.password ? errors.password : null}
							</div>

							<div className="form-row">
								<label htmlFor="isActive">Active</label>
								<Field className="field" as="select" name="isActive">
									<option value="true">True</option>
									<option value="false">False</option>
								</Field> {errors.isActive ? errors.isActive : null} </div>
							<div className="form-row">
								<label htmlFor="userType">User Type</label>
								<Field className="field" as="select" name="userType">
									<option value="admin">Admin</option>
									<option value="standard">Standard</option>
								</Field> {errors.userType ? errors.userType : null} </div>
							<div className="form-row">
								<label htmlFor="firstName">First Name</label>
								<input
									type="firstName"
									name="firstName"
									id="firstName"
									value={values.firstName}
									onChange={handleChange}
									onBlur={handleBlur}

								/> {errors.firstName ? errors.firstName : null}  </div>

							<div className="form-row">
								<label htmlFor="lastName">Last Name</label>
								<input
									type="lastName"
									name="lastName"
									id="lastName"
									value={values.lastName}
									onChange={handleChange}
									onBlur={handleBlur}

								/> {errors.lastName ? errors.lastName : null} </div>

							<div className="form-row">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									name="email"
									id="email"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									className={
										errors.email && touched.email ? "input-error" : null
									}
								/>  {errors.email ? errors.email : null}   </div>

							<button
								type="submit"
								className={!(dirty && isValid) ? "disabled-btn" : ""}
								disabled={!(dirty && isValid)}
							>
								Create
              </button>
						</form>
					</div>
				);
			}}
		</Formik>
	);
}

export default CreateUserComponent;