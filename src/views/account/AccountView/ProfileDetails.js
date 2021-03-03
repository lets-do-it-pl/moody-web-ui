import { accountService} from 'src/_services';
import { StatusType } from 'src/_types';
import {useSnackbar, withSnackbar} from 'notistack';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import React from 'react';
import {
  Box,
  Button,
  TextField,
  makeStyles,
  Container,
  Typography
} from '@material-ui/core';
import * as Yup from 'yup';

   const useStyles = makeStyles(() => ({
    root: {}
  }));

  const ProfileDetails = (props) => {
  const classes = useStyles();
  const { account} = props;
  const { enqueueSnackbar } = useSnackbar();

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

               enqueueSnackbar("Updated Successfully", { variant: "success" });
                return;
              }
              enqueueSnackbar("Unable to Update!", { variant: "error" });
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

export default withSnackbar(ProfileDetails);
 