import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, FormLabel, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo200Image from '../assets/img/logo/logo_200.png';
import Recaptcha from 'react-recaptcha';
import loadjs from 'loadjs';

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
    .min(3,'Username must be at least 3 characters')
    .required('Required'),
  firstName: yup
    .string()
    .required('Required'),
  lastName: yup
    .string()
    .required('Required'),

});

const SignUpPage = () =>
{
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName:'',
      username:''
    },
    validateOnBlur:true,
    validationSchema: validationSchema,
    onSubmit: (values) =>
    {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                autoFocus
                id="firstName"
                name="firstName"
                label="First Name"
                variant="outlined"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName) }
                helperText={formik.touched.firstName && formik.errors.firstName} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName) }
                helperText={formik.touched.lastName && formik.errors.lastName} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username) }
                helperText={formik.touched.username && formik.errors.username} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email) }
                helperText={formik.touched.email && formik.errors.email} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12} className="center-recapthca">
              <Recaptcha
                sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                render="explicit"
              />
              <FormLabel error>Please Verify ReCaptcha</FormLabel>
            </Grid>
            <Button color="primary" variant="contained" fullWidth type="submit" className={classes.submit}>
              Submit
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
      </div>
    </Container>

  );
};

export default SignUpPage;