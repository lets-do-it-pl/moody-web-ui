import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography, FormHelperText, MenuItem
} from '@material-ui/core';
import * as Yup from 'yup';
import { userService } from '../../_services';
import { StatusType } from '../../_types';
import { Formik } from 'formik';

const userTypes = [
  {
    value: 'A',
    label: 'Admin',
  },
  {
    value: 'S',
    label: 'Standard',
  },
  {
    value: 'C',
    label: 'Client',
  }
];

const yesOrNo = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  }
];

const UserDetails = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const {id,email, fullName, userType, canLogin, isActive} = props.initialValues;

  return (
            <Formik
              initialValues={{
                id: id,
                email: email,
                fullName: fullName,
                password: null,
                userType: userType,
                canLogin: canLogin,
                isActive: isActive,
              }}
              validationSchema={
                Yup.object().shape({
                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  fullName: Yup.string().max(255).required('First name is required'),
                  userType: Yup.string().oneOf(['A','S','C']),
                  isActive: Yup.bool().required(),
                  canLogin: Yup.bool().required(),
                })
              }
              onSubmit={
                async (value) => {
                  const result = await userService.updateUserDetails(
                    value.id,
                    value.fullName,
                    value.email,
                    value.userType,
                    value.isActive,
                    value.canLogin,
                    value.password
                    );

                  if (result.status === StatusType.Success) {
                    setErrorMessage('');
                    setInfoMessage("User updated succesfully");

                    return;
                  }
                  setErrorMessage(result.message);
                }
              }
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
                <Card>
                  <CardHeader
                    subheader="The information can be edited"
                    title="User"
                  />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <TextField
                        error={Boolean(touched.fullName && errors.fullName)}
                        fullWidth
                        helperText={touched.fullName && errors.fullName}
                        label="Full Name"
                        margin="normal"
                        name="fullName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.fullName}
                        variant="outlined"
                        size="small"
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
                        size="small"
                      />
                      <TextField
                        select
                        error={Boolean(touched.userType && errors.userType)}
                        fullWidth
                        helperText={touched.userType && errors.userType}
                        label="User Type"
                        margin="normal"
                        name="userType"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="userType"
                        value={values.userType}
                        variant="outlined"
                        size="small"
                      >
                        {userTypes.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    <TextField
                        select
                        error={Boolean(touched.isActive && errors.isActive)}
                        fullWidth
                        helperText={touched.isActive && errors.isActive}
                        label="Is Active?"
                        margin="normal"
                        name="isActive"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="isActive"
                        value={values.isActive}
                        variant="outlined"
                        size="small"
                    >
                        {yesOrNo.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    <TextField
                        select
                        error={Boolean(touched.canLogin && errors.canLogin)}
                        fullWidth
                        helperText={touched.canLogin && errors.canLogin}
                        label="Can Login?"
                        margin="normal"
                        name="canLogin"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="canLogin"
                        value={values.canLogin}
                        variant="outlined"
                        size="small"
                      >
                        {yesOrNo.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
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
                      size="small"
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

                    </Grid>
                  </CardContent>
                  <Divider />
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    p={2}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Save details
                    </Button>
                  </Box>
                </Card>
                </form>
                )}
            </Formik>
);
};

UserDetails.propTypes = {
  className: PropTypes.string
};

export default UserDetails;
