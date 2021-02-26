import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

const dict = new Map();
dict.set('S', 'Standard');
dict.set('A', 'Admin');

const UsersView = (props) =>
{
  const { users, className, loadUserDetails, deleteUser, setUsers, setUserDetailsVisibility } = props;

  const [currentUser, setCurrentUser] = useState();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () =>
  {
    setOpen(true);
  };

  const handleDeleteUser = (e, user) =>
  {
    e.preventDefault();
    deleteUser(user.id);
    setUsers(users.filter(x => x.id !== user.id));
    setOpen(false);
    setUserDetailsVisibility(true);
  };

  const handleClose = () =>
  {
    setOpen(false);
  };

  return (
    <Card
      className={clsx(className)}
    >
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <Typography color={'error'}>
            You are about to delete this user? Proceed with caution.
          </Typography>
        </DialogContent>
        <Box my={2}>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color='primary' type="button" variant="contained" onClick={(e) =>
            {
              handleDeleteUser(e, currentUser);
            }}
            >
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <PerfectScrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="default">
                User
              </TableCell>
              <TableCell>
                Role
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(0).map((user) => (
                <TableRow
                  hover
                  key={user.id}
                  // selected={user.id == 2 ? true : false} For row selection.
                >
                  <TableCell>
                    {user.fullName}
                  </TableCell>
                  <TableCell>
                    {dict.get(user.userType)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={user.description === null ? "No description" : user.description}>
                      <IconButton aria-label="description" disableRipple disableFocusRipple>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    <IconButton aria-label="edit" onClick={(e) =>
                    {
                      e.preventDefault();
                      loadUserDetails(user.id);
                    }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() =>
                    {
                      setCurrentUser(user);
                      handleClickOpen();
                    }}>
                      <DeleteIcon color={'error'} />
                    </IconButton>

                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </PerfectScrollbar>
    </Card>
  );
};

UsersView.propTypes = {
  users: PropTypes.array.isRequired
};

export default UsersView;
