import React from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, FormLabel, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo200Image from '../assets/img/logo/logo_200.png';
import loadjs from 'loadjs';
import Axios from 'axios';
import SignUpForm from '../components/SignUpForm';
import API from '../api/API';
import { NotificationContainer } from 'react-notifications';


loadjs('https://www.google.com/recaptcha/api.js');


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
}));


const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Required'),
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .required('Required'),
  firstName: yup
    .string()
    .required('Required'),
  lastName: yup
    .string()
    .required('Required'),
  recaptcha: yup
    .bool()
    .oneOf([true], 'Please verify reCaptcha'),
});

const SignUpPage = () => {

  function handleSubmit(values) {

    API.SaveUser(values);
  }

  const values = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    recaptcha: false,
  };


  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Link to='/'>
          <img
            src={logo200Image}
            className="rounded"
            style={{ width: 60, height: 60, cursor: 'pointer', marginBottom: 10 }}
            alt="logo" />
        </Link>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          render={props => <SignUpForm classes={classes} {...props} />}
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          classes={useStyles()}
        />
        <NotificationContainer />
      </div>
    </Container>

  );
};

export default SignUpPage;