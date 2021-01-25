import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

function CategoryCount(props, { className, ...rest }) {
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
              CATEGORY
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
              <CategoryOutlinedIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

CategoryCount.propTypes = {
  className: PropTypes.string
};

export default CategoryCount;