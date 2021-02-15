import { authenticationService } from 'src/_services';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';


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
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>

        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
