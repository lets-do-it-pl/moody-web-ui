import React from 'react';
import { TextField, Button, Grid, FormLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';


function SignUpForm(props)
{
  const {
    values: {
      email,
      password,
      firstName,
      lastName,
      username,
      recaptcha,
    },
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    classes
  } = props;

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name*"
            variant="outlined"
            size="small"
            value={firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name*"
            variant="outlined"
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            value={lastName}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username*"
            variant="outlined"
            size="small"
            onChange={handleChange}
            onBlur={handleBlur}
            value={username}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email*"
            variant="outlined"
            size="small"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password*"
            type="password"
            variant="outlined"
            size="small"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
        </Grid>
        <Grid item xs={12} className="center-recapthca">
          <Recaptcha
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
            render="explicit"
            onChange={handleChange}
            verifyCallback={(response) =>
            {
              setFieldValue('recaptcha', response);
            }}
          />
          {errors.recaptcha ? <FormLabel error>{errors.recaptcha}</FormLabel> : null}
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
  );
}


export default SignUpForm;