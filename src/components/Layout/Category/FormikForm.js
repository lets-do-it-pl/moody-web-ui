import React from 'react';
import {Formik, useField, Form} from 'formik';
import {Styles} from './Styles';
import * as Yup from 'yup';

const CustomTextInput = ({label, ...props}) => {
    const[field, meta] = useField(props);

    return(
        <>
            <label htmlFor = {props.id || props.name}>{label}</label>
            <input className = "text-input" {...field} {...props}/>
            {meta.touched && meta.error ? (
                <div className = "error">{meta.error}</div>
            ) : null}
        </>
    )
}

function FormikForm() {
    return (
      <Styles>
        <Formik
            initialValues = {{
                name : '',
                id : '',
            }}
            validationSchema = {Yup.object({
                name : Yup.string()
                    .required("Required"),
                id : Yup.number()
                    .required("Required")
            })}

            onSubmit = {(values, {setSubmitting, resetForm}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    resetForm();
                    setSubmitting(false);
                })
            }}
        >
    {props => (
        <Form>
            <CustomTextInput label="name" name="name" type="text" placeHolder="Name"/>
            <CustomTextInput label="id" name="id" type="number" placeHolder="Id"/>
            <button type="submit">{props.isSubmitting ? "Loading" : "Submit"}</button>
        </Form>
    )

    }

        </Formik>
      </Styles>
    )
}

export default FormikForm;
