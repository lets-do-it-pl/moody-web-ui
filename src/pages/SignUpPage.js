import React from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, FormLabel, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo200Image from '../assets/img/logo/logo_200.png';
import Recaptcha from 'react-recaptcha';
import loadjs from 'loadjs';
import Axios from 'axios';
import SignUpForm from '../components/SignUpForm';

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
    margin: theme.spacing(2, 0, 2),
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

const SignUpPage = () =>
{

  function handleSubmit(values)
  {
    const Request = Axios.CancelToken.source();

    async function fetchResults()
    {
      try
      {
        const response = await Axios.post('/api/user',
          values, { cancelToken: Request.token });
          console.log(response.data)
      } catch (e)
      {
        console.log('There was a problem or the request cancelled.');
        console.log(e.response);
      }
    }

    fetchResults();
    return () => Request.cancel();
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
      </div>
    </Container>

  );
};

export default SignUpPage;