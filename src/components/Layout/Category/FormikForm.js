import React from 'react';
import * as Yup from 'yup';
import {Styles} from './Styles';
import {connect} from "react-redux";
import {Formik, useField, Form} from 'formik';
import Button from '@material-ui/core/Button';
import * as actions from 'actions/categoryAction';
import { makeStyles } from '@material-ui/core/styles';

const CustomTextInput = ({label, ...props}) => {
    const[field, meta] = useField(props);

    return(
        <>
            <label htmlFor = {props.id || props.name}>{label}</label>
            <input className = "text-input" {...field} {...props}/>
            {meta.touched && meta.error ? (
                <div>{meta.error}</div>
            ) : null}
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    submit: {
      backgroundColor: "#5cb85c",
      color : "white"
    },
  }));

const FormikForm = ({setFieldValue, ...props}) =>  {
    const classes = useStyles();
    return (
        <Styles>
            <Formik
                initialValues = {{
                    name : undefined,
                    id : undefined,
                    image : undefined
                }}
                validationSchema = {Yup.object({
                    name : Yup.string()
                        .required("Required"),
                    order : Yup.number()
                        .required("Required"),
                    image : Yup.mixed()
                        .required("Required")
                })}

                onSubmit = {(values, {setSubmitting, resetForm}) => {
                    setTimeout(() => {
                        props.createCategory(values);
                        props.getCategories();
                        resetForm();
                        setSubmitting(false);
                    })
                }}>

                {props => (
                    <Form>
                        <CustomTextInput label="Name" name="name" type="text" placeholder="Category1"/>
                        <CustomTextInput label="Order" name="order" type="number" placeholder="1"/>
                        <CustomTextInput name="image" type="file"/>
                        <Button type="submit" className={classes.submit} variant="contained">{props.isSubmitting ? "Loading" : "Submit"}</Button>
                    </Form>
                )}
            </Formik>
        </Styles>
    )
}

const mapActionToProps = {
    getCategories : actions.getCategories,
    createCategory : actions.createCategory
}

export default connect(null, mapActionToProps)(FormikForm);
