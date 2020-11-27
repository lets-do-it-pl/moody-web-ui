import React, { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { TextField, Button, Grid, FormLabel } from '@material-ui/core';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';
import loadjs from 'loadjs';
import * as Yup from 'yup';
import { Formik, useField } from 'formik';

function SignUpForm(props)
{

  loadjs('https://www.google.com/recaptcha/api.js');

  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <TextField
        error={meta.touched && meta.error ? true : false}
        helperText={meta.touched && meta.error  ? meta.error : ''}
        variant="outlined"
        label={props.label}
        {...field}
        {...props}
      />
    );
  }

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        username: '',
        captcha: false,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email addresss`')
          .required('Required'),
        password: Yup.string()
          .required('Required')
          .min(8, 'Must be at least 8 characters!'),
        username: Yup.string()
          .min(3, 'Username must be a leat 3 characters')
          .required('Required')
      })}

      onSubmit={async (values, { setSubmitting }) =>
      {
        await new Promise(r => setTimeout(r, 500));
        setSubmitting(false);
      }}>

      <form  noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <MyTextInput
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              size="small"
              id="firstName"

              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextInput
              variant="outlined"
              required
              fullWidth
              size="small"
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextInput
              variant="outlined"
              required
              fullWidth
              size="small"
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextInput
              variant="outlined"
              required
              fullWidth
              size="small"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextInput

              variant="outlined"
              required
              fullWidth
              size="small"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12} className="center-recapthca">
            <Recaptcha
              sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
              render="explicit"
            />
          <FormLabel error>Please Verify ReCaptcha</FormLabel>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to='/login' variant="body2">
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
        </Grid>
      </form>
    </Formik>
      );
}


export default SignUpForm;