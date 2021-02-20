import React, { useState } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  TextField,
  makeStyles,
  Container,
  FormHelperText
} from '@material-ui/core';
import { accountService, authenticationService } from 'src/_services';
import { Typography } from '@material-ui/core';
import { StatusType } from 'src/_types';
import Page from 'src/components/Page';


  const useStyles = makeStyles(() => ({
    root: {}
  }));

  const ProfileDetails = (props) => {
  const classes = useStyles();
  const { account, className, ...rest } = props;

  const [values, setValues] = useState({
    Name: account.fullName,
    email: account.email,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  // const handleChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };

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
                .updateAccountDetails(
                  value.name,
                  value.email);

              if (result.status === StatusType.Success) {
                setErrorMessage('');
                setInfoMessage("Account updated successfully !");

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
    // <form
    //   autoComplete="off"
    //   noValidate
    //   className={clsx(classes.root, className)}
    //   {...rest}
    // >
    //   <Card>
    //     <CardHeader
    //       subheader="The information can be edited"
    //       title="Profile"
    //     />
    //     <Divider />
    //     <CardContent>
    //       <Grid
    //         container
    //         spacing={3}
    //       >
    //         <Grid
    //           item
    //           md={6}
    //           xs={12}
    //         >
    //           <TextField
    //             fullWidth
    //             helperText="Please specify the first name"
    //             label="fullName"
    //             name="fullName"
    //             onChange={handleChange}
    //             required
    //             value={values.Name}
    //             variant="outlined"
    //           />
    //         </Grid>
    //         <Grid
    //           item
    //           md={6}
    //           xs={12}
    //         >
    //           <TextField
    //             fullWidth
    //             label="Email Address"
    //             name="email"
    //             onChange={handleChange}
    //             required
    //             value={values.email}
    //             variant="outlined"
    //           />
    //         </Grid>
    //       </Grid>
    //     </CardContent>
    //     <Divider />
    //     <Box
    //       display="flex"
    //       justifyContent="flex-end"
    //       p={2}
    //     >
    //       <Button
    //         color="primary"
    //         variant="contained"
    //       >
    //         Save details
    //       </Button>
    //     </Box>
    //   </Card>
    // </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
