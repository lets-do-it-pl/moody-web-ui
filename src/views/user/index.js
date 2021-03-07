import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import UsersView from './UsersView';
import { userService } from '../../_services';
import { StatusType } from '../../_types';
import UserDetails from './UserDetails';
import AddUserDialog from './AddUserDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Users = () =>
{
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState();
  const [originalUsers, setOriginalUsers] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [userDetailsHidden, setUserDetailsHidden] = useState(true);

  const requestSearch = (searchedValue) => {
    const modifiedUsers = originalUsers.filter((user) => {
      return user.fullName.toLowerCase().includes(searchedValue.toLowerCase());
    });
    setFilteredUsers(modifiedUsers);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() =>
  {
    loadUsers();
  }, []);

  async function loadUsers()
  {
    const result = await userService.getUsers();

    if (result.status === StatusType.Fail)
    {
      console.log(result.data);
      return;
    }
    console.log(result.data);

    setOriginalUsers(result.data);
    setFilteredUsers(result.data);

    setLoading(false);
  }

  async function sortUsers()
  {
      setFilteredUsers((prev)=>[...prev.reverse()]);
      console.log(originalUsers)
  }

  const classes = useStyles();

  async function loadUserDetails(id)
  {
    setUserDetailsHidden(true);

    const result = await userService.getUserDetails(id)
      if (result.status === StatusType.Fail)
      {
        console.log(result.data); // Change it with notification !
        return;
      }
      setUserDetails(result.data);
      setUserDetailsHidden(false);
  }

  async function deleteUser(id)
  {
   const result = await userService.deleteUser(id)
      if (result.status === StatusType.Fail)
      {
        console.log(result.data); // Change it with notification !
        return;
      }
      console.log(result.data); // Change it with notification !
  }

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="flex-start"
          paddingBottom="10px"
        >
          <AddUserDialog loadUsers={loadUsers} handleClickOpen={handleClickOpen} handleClose={handleClose} open={open}/>
        </Box>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            {loading ? (
              <Typography
                color="primary"
                variant="h5"
              >
                Loading...
              </Typography>
            ) : (
              <UsersView filteredUsers={filteredUsers}
                         setUserDetailsVisibility={setUserDetailsHidden}
                         setFilteredUsers={setFilteredUsers}
                         loadUserDetails={loadUserDetails}
                         deleteUser={deleteUser}
                         sortUsers={sortUsers}
                         requestSearch={requestSearch} />
            )}
          </Grid>
          <Grid hidden={userDetailsHidden}
                item
                lg={6}
                md={6}
                xs={12}
          >
            {!userDetailsHidden && (
              <UserDetails initialValues={userDetails} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Users;
