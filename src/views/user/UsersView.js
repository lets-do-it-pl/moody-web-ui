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
  TableRow, TableSortLabel,
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
import SearchBar from "material-ui-search-bar";

const dict = new Map();
dict.set('S', 'Standard');
dict.set('A', 'Admin');

const UsersView = (props) =>
{
  const { usersFiltered, className, loadUserDetails, deleteUser, setUsersFiltered, setUserDetailsVisibility, sortUsers, requestSearch } = props;

  const [currentUser, setCurrentUser] = useState();
  const [open, setOpen] = React.useState(false);
  const [direction, setDirection] = React.useState('desc');
  const [searched, setSearched] = useState("");

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleClickOpen = () =>
  {
    setOpen(true);
  };

  const handleDeleteUser = (e, user) =>
  {
    e.preventDefault();
    deleteUser(user.id);
    setUsersFiltered(usersFiltered.filter(x => x.id !== user.id));
    setOpen(false);
    setUserDetailsVisibility(true);
  };

  const handleClose = () =>
  {
    setOpen(false);
  };

  const handleDirection = () =>
  {
    setDirection((prev)=>{return  prev === 'desc' ? 'asc' : 'desc' })
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
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      <PerfectScrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                Number
              </TableCell>
              <TableCell align="center">
              <TableSortLabel
                  active={true}
                  direction={direction}
                  onClick={()=>{sortUsers();handleDirection();}}
                >
                </TableSortLabel>
                User
              </TableCell>
              <TableCell align="center">
                Role
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersFiltered.slice(0).map((user, index) => (
                <TableRow
                  hover
                  key={user.id}
                >
                  <TableCell align="center">
                    {index+1}
                  </TableCell>
                  <TableCell align="center">
                    {user.fullName}
                  </TableCell>
                  <TableCell align="center">
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
                      <DeleteIcon color='error' />
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
  usersFiltered: PropTypes.array.isRequired
};

export default UsersView;
