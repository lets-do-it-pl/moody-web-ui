import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import { authenticationService } from 'src/_services';
import { StatusType } from 'src/_types';

const useStyles = theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
});

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  navigateToPage = (url) => {
    window.location.href = url;
  };

  render() {
    const { classes } = this.props;

    return (
      <Page
        className={classes.root}
        title="Moody - Login"
      >
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                email: 'user@gmail.com',
                password: 'Password1.'
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
              })}
              onSubmit={async (value) => {
                var result = await authenticationService.login(value.email, value.password)

                if (result.status === StatusType.Success) {
                  this.state.error = '';
                  this.navigateToPage('/');

                  return;
                }

                this.state.error = result.message;
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={2}>
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
                      Sign in
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Sign in on Moody Management Application
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <Typography
                    color="error"
                    variant="h5"
                  >
                    {this.state.error}
                  </Typography>
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Don&apos;t have an account?
                    {' '}
                    <Link
                      component={RouterLink}
                      to="/register"
                      variant="h6"
                    >
                      Sign up
                    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </Page>
    );
  }
}

export default withStyles(useStyles)(LoginView)