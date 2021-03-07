import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { userService } from '../../_services';
import { StatusType } from '../../_types';
import { Typography } from '@material-ui/core';
import { Formik } from 'formik';

function AddUserDialog(props) {

  const {handleClickOpen,handleClose, open, loadUsers} = props;
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add User
      </Button>
      <Formik
        initialValues={{
          email: '',
          fullName: '',
          password: ''
        }}
        validationSchema={
          Yup.object().shape({
            email: Yup.string().email('Must be a valid email').min(3, 'Too Short!').max(255).required('Email is required'),
            fullName: Yup.string().min(3, 'Too Short!').max(100, 'Too Long!').required('Full name is required').matches(/^[A-Za-z]+$/, { message: "Full name must only contain alphabets", excludeEmptyString: true }),
            password: Yup.string().min(3, 'Too Short!').max(100, 'Too Long!').required('Password is required')
          })
        }
        onSubmit={async (value) => {
          const result = await userService
            .register(
              value.fullName,
              value.email,
              value.password);

          if (result.status === StatusType.Success) {
            setErrorMessage('');
            setInfoMessage("A confirmation email has been sent to you. Please check your mail box!");
            loadUsers();
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
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  error={Boolean(touched.fullName && errors.fullName)}
                  fullWidth
                  helperText={touched.fullName && errors.fullName}
                  label="Full name"
                  margin="normal"
                  name="fullName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
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
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  type={'submit'}
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Add User
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        )}
      </Formik>

    </div>
  );
}
AddUserDialog.propTypes = {
  handleClickOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open : PropTypes.bool.isRequired
};

export default AddUserDialog;
