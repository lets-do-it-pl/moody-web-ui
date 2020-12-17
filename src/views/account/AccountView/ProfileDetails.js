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

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    fullname: 'Katarina',
    email: 'demo@devias.io',
    userType: '',
    pass1: '',
    pass2: ''
  });

  const renderSwitch = (param) => {
    switch(param) {
      case 'S':
        return 'Standart';
      case 'A':
        return 'Admin';
      default:
        return 'None';
    }
  }

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
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Fullname"
                name="fullname"
                onChange={handleChange}
                required
                value={values.fullname}
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
                InputProps={{
                  readOnly: true,
                }}
                value={values.email}
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
                label="User Type"
                name="userType"
                onChange={handleChange}
                InputProps={{
                  readOnly: true,
                }}
                value={renderSwitch(values.userType)}
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
                label="New Password"
                name="pass1"
                onChange={handleChange}
                required
                value={values.pass1}
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
                label="Confirm New Password"
                name="pass2"
                onChange={handleChange}
                required
                value={values.pass2}
                variant="outlined"
                helperText={(values.pass1 !== values.pass2) ? "Passwords are not match!" : null}
                error={values.pass1.length>1 && values.pass1 !== values.pass2}
              >
              </TextField>
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
            disabled={values.pass1.length>1 && values.pass1 !== values.pass2}
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
