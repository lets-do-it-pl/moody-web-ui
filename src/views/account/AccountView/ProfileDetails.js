import React, { useState } from 'react';
import clsx from 'clsx';
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
  makeStyles
} from '@material-ui/core';
import { authenticationService } from 'src/_services';

const user = {
  avatar: authenticationService.currentUserValue !== null &&
    authenticationService.currentUserValue !== {} &&
    authenticationService.currentUserValue.profileImage !== null &&
    authenticationService.currentUserValue.profileImage !== undefined &&
    authenticationService.currentUserValue.profileImage !== "" ?
    authenticationService.currentUserValue.profileImage :
    '/static/images/avatars/default.png',
  name: authenticationService.currentUserValue !== null &&
    authenticationService.currentUserValue !== {} ?
    authenticationService.currentUserValue.fullName :
    ""
};
const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest },props) => {
  const classes = useStyles();
  const {account} = props;
  const [values, setValues] = useState({
    Name: account.fullName,
    email: account.email,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="Name"
                name="fullname"
                onChange={handleChange}
                required
                value={values.Name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
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
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
