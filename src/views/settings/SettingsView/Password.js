import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userService } from 'src/_services';
import { StatusType } from 'src/_types';
import clsx from 'clsx';
import { showAlert } from 'src/_helpers/alert';
import { AlertType } from 'src/_types/alertType'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  FormHelperText,
  Typography,
  makeStyles
} from '@material-ui/core';


const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ className, ...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    password: '',
    newPassword: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Formik
      initialValues={{
        password: '',
        newPassword: '',
        confirm: '',
      }}
      validationSchema={
          Yup.object().shape({
            password: Yup.string().max(255).required('Password is required'),
            newPassword: Yup.string().max(255).required('New password is required'),
            confirm: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
          })
      }
        onSubmit={async (value) => {
          var token = getToken();

          var result = await userService.resetOwnPassword(token, value.password);
          
          if (result.status === StatusType.Success) {
            showAlert(this.props, 'Your new password has been set.', AlertType.Success);

             return;
          }
          showAlert(this.props, result.message, AlertType.Error);

          return;
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
          <form onSubmit={handleSubmit}
            className={clsx(classes.root, className)}
            {...rest}
          >
          <Card>
            <CardHeader
              subheader="Update password"
              title="Password"
            />
            <Divider />
            <CardContent>
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Current password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.newPassword && errors.newPassword)}
                fullWidth
                helperText={touched.newPassword && errors.newPassword}
                label="New password"
                margin="normal"
                name="newPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.newPassword}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.confirm && errors.confirm)}
                fullWidth
                helperText={touched.confirm && errors.confirm}  
                label="Confirm new password"
                margin="normal"
                name="confirm"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.confirm}
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
              <Typography
                color="primary"
                variant="h5"
              >
                {infoMessage}
              </Typography>
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
                disabled={isSubmitting}
                size="large"
                type="submit"
              >
               Update
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
