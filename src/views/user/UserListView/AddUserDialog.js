import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userService } from '../../../_services';
import { StatusType } from '../../../_types';
import { Box, FormHelperText, Typography } from '@material-ui/core';

export default function AddUserDialog(props) {

  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  return (
    <div>
      <Button variant="contained" color="primary" onClick={props.handleClickOpen}>
        Add User
      </Button>
      <Formik
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: ''
        }}
        validationSchema={
          Yup.object().shape({
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            firstName: Yup.string().max(255).required('First name is required'),
            lastName: Yup.string().max(255).required('Last name is required'),
            password: Yup.string().max(255).required('password is required')
          })
        }
        onSubmit={async (value) => {
          const result = await userService
            .register(
              value.firstName,
              value.lastName,
              value.email,
              value.password);

          if (result.status === StatusType.Success) {
            setErrorMessage('');
            setInfoMessage("A confirmation email has been sent to you. Please check your mail box!");

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
          <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add User</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
            <Box mb={3}>
              <Typography
                color="textPrimary"
                variant="h2"
              >
                Create a new user
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use an email to create new user
              </Typography>
            </Box>
            <TextField
              error={Boolean(touched.firstName && errors.firstName)}
              fullWidth
              helperText={touched.firstName && errors.firstName}
              label="First name"
              margin="normal"
              name="firstName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.lastName && errors.lastName)}
              fullWidth
              helperText={touched.lastName && errors.lastName}
              label="Last name"
              margin="normal"
              name="lastName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
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
            {Boolean(touched.policy && errors.policy) && (
              <FormHelperText error>
                {errors.policy}
              </FormHelperText>
            )}
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
            </DialogContent>
            <Box my={2}>
              <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                  Cancel
                </Button>
                <Button color="primary" type="submit" variant="contained" disabled={isSubmitting}
                >
                  Add
                </Button>
              </DialogActions>
            </Box>
          </form>
          </Dialog>
          )}
      </Formik>
          </div>
  );
}
