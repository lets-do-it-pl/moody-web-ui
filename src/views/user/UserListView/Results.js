import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import AddUserDialog from './AddUserDialog';
import EditUserDialog from './EditUserDialog';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  tableRow:{
  "&:hover": {
    cursor: "pointer"
  }
}
}));

const dict = new Map();
dict.set("S", "Standard");
dict.set("A", "Admin");
dict.set("C", "Client");

const Results = ({ className, users, ...rest }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <EditUserDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose}/>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Role
                </TableCell>
                <TableCell>
                  Active
                </TableCell>
                <TableCell>
                  Can Login
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0).map((user) => (
                <TableRow
                  classes={{hover:classes.tableRow}}
                  onClick={handleClickOpen}
                  hover
                  key={user.id}
                >
                  <TableCell >
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={user.avatarUrl}
                      >
                        {getInitials(user.fullName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {user.fullName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {dict.get(user.userType)}
                  </TableCell>
                  <TableCell>
                    {user.isActive.toString()}
                  </TableCell>
                  <TableCell>
                    {user.canLogin.toString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default Results;
