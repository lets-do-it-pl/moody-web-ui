import { accountService} from 'src/_services';
import React, { useState } from 'react';
import { StatusType,AlertType } from 'src/_types';
import { withSnackbar } from 'notistack';
import { showAlert } from '../../../_helpers/alert';
import { withStyles } from '@material-ui/styles';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  makeStyles,
  Container,
  Typography
} from '@material-ui/core';
import * as Yup from 'yup';

  const styles = () => ({
    update: {
      color: 'orange'
    },
    details: {
      color: 'purple'
    },
    table: {
      width: '100%'
    },
    delete: {
      color: 'red'
    }
  });

  const useStyles = makeStyles(() => ({
    root: {}
  }));

  const ProfileDetails = (props) => {
  const classes = useStyles();
  const { account} = props;

  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  return (
    <Page
      className={classes.root}
      title="Register"
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
              name: account.fullName,
              email: account.email

            }}

            validationSchema={
              Yup.object().shape({
                name: Yup.string().min(3, 'Too Short!').max(100, 'Too Long!').required('Full Name is required'),
                email: Yup.string().email('Must be a valid email').min(3, 'Too Short!').max(255).required('Email is required'),
              })
            }
            onSubmit={async (value) => {
              var result = await accountService
                .updateAccount(
                  value.name,
                  value.email);

              if (result.status === StatusType.Success) {
                setErrorMessage('');
                showAlert('Updated successfully', AlertType.Success);
                return;
              }

              setErrorMessage(result.message);
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
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Profile
                </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Full Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  variant="outlined"
                />
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
                <Typography
                  color="error"
                  variant="h5"
                >
                  {errorMessage}
                </Typography>
                <Typography
                  color="primary"
                  variant="h5"
                >
                  {infoMessage}
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
                    Save details
                </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
    
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default withSnackbar(withStyles(styles)(ProfileDetails));
