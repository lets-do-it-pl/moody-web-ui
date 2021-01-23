import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const MobilClientCount = (props, { className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item
            md={7}
            xs={12}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL MOBIL CLIENT
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {props.TotalNumber}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PhoneAndroidOutlinedIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

MobilClientCount.propTypes = {
  className: PropTypes.string
};

export default MobilClientCount;