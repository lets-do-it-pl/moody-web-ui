import React from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import {Form} from 'reactstrap';


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



const CreateUserComponent = () => {
	const { handleSubmit, handleChange, values, errors } = useFormik({
		initialValues: {
            userName: '',
            password: '',
            isActive: '',
            userType: '',
			firstName: '',
			lastName: '',
			email: '',
		},
		validationSchema,
		onSubmit: values => {
			console.log(values);
		},
	});
    return(
		<form onSubmit={handleSubmit}>
            <input
				type="text"
				name="userName"
				placeholder="Username"
				onChange={handleChange}
				values={values.userName}
			/>
			{errors.userName ? errors.userName : null}
            <input
				type="text"
				name="password"
				placeholder="password"
				onChange={handleChange}
				values={values.password}
			/>
			{errors.password ? errors.password : null}
            <Form.Field
                type="isActive"
                data={['True', 'False']}
                name="isActive" />
            {errors.isActive ? errors.isActive : null}
            <Form.Field
                type="userType"
                data={['Admin', 'Standard']}
                name="userType" />
                {errors.userType ? errors.userType : null}
			<input
				type="text"
				name="firstName"
				placeholder="First name"
				onChange={handleChange}
				values={values.firstName}
			/>
			{errors.firstName ? errors.firstName : null}
			<input
				type="text"
				name="lastName"
				placeholder="Soyad"
				onChange={handleChange}
				values={values.lastName}
			/>
			{errors.lastName ? errors.lastName : null}
			<input
				type="text"
				name="email"
				placeholder="E-mail"
				onChange={handleChange}
				values={values.email}
			/>
            {errors.email ? errors.email : null}
			<button type="submit">Create</button>
		</form>
	);
}


export default CreateUserComponent;