import React from 'react';
import { TextField, Button, Grid, FormLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';

function SignInForm(props) {
  const {
    values: {
      email,
      password,
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
            verifyCallback={() => {
              setFieldValue('recaptcha', true);
              props.values.recaptcha = true;
            }}
          />
          {errors.recaptcha
            && touched.recaptcha && (
              <FormLabel error>{errors.recaptcha}</FormLabel>
            )}
        </Grid>

        <Button fullWidth color="primary" variant="contained" type="submit" className={classes.submit}>
          Login
        </Button>

        <Grid container justify="flex-end">
          <Grid item>
            <Link to='/signup' variant="body2">
              Signup
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}

export default SignInForm;