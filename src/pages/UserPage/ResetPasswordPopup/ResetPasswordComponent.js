import React from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import "../CreateUserPopup/formStyle.scss";


const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',

};

const validationSchema = Yup.object({
    oldPassword: Yup.string()
        .required('Password is required!'),
    newPassword: Yup.string()
        .min(6, 'Password has to be longer than 6 characters!')
        .required('Password is required!'),
    confirmNewPassword: Yup.string()
        .min(6, 'Password has to be longer than 6 characters!')
        .required('Password is required!')
});

const ResetPasswordComponent = ({ onSubmit }) => {

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
					handleBlur,
					isValid,
					dirty
				} = formik;
				return (
					<div className="container">
						<h1>Reset Password</h1>
						<form onSubmit={handleSubmit}>
							<div className="form-row">
								<label htmlFor="oldPassword">Old Password</label>
								<input
									type="oldPassword"
									name="oldPassword"
									id="oldPassword"
									value={values.oldPassword}
									onChange={handleChange}
									onBlur={handleBlur}

								/>
								{errors.oldPassword ? errors.oldPassword : null} </div>

							<div className="form-row">
								<label htmlFor="newPassword">New Password</label>
								<input
									type="newPassword"
									name="newPassword"
									id="newPassword"
									value={values.newPassword}
									onChange={handleChange}
									onBlur={handleBlur}

								/>
								{errors.newPassword ? errors.newPassword : null}
							</div>

                            <div className="form-row">
								<label htmlFor="confirmNewPassword">Confirm New Password</label>
								<input
									type="confirmNewPassword"
									name="confirmNewPassword"
									id="newPasconfirmNewPasswordsword"
									value={values.confirmNewPassword}
									onChange={handleChange}
									onBlur={handleBlur}

								/>
								{errors.confirmNewPassword ? errors.confirmNewPassword : null}
							</div>
                            <button
								type="reset"
								className={!(dirty && isValid) ? "disabled-btn" : ""}
								disabled={!(dirty && isValid)}
							>
								Reset Password
              </button>
						</form>
					</div>
				);
			}}
		</Formik>
	);
}

export default ResetPasswordComponent;