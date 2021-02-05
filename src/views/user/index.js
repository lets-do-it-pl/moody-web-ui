import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './UserListView/Results';
import { userService } from '../../_services';
import { StatusType } from '../../_types';
import UserDetails from './userDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const Users = () => {
  const [loading,setLoading] = useState(true);
  const [users,setUsers] = useState([]);
  const [userDetails,setUserDetails] = useState({})
  const [userDetailsVisibility,setUserDetailsVisibility] = useState(true);

  useEffect( () =>
  {
    async function loadUsers(){
      const result = await userService.getUsers();

      if (result.status === StatusType.Fail)
      {
        console.log(result.data);
        return;
      }
      console.log(result.data)
      setUsers(result.data)
      setLoading(false);
    }
    loadUsers()
  }, []);

  const classes = useStyles();

  async function loadUserDetails(id)
  {
    setUserDetailsVisibility(true);

   await userService.getUserDetails(id).then((result)=>{
     if (result.status === StatusType.Fail)
     {
       console.log(result.data); // Change it with notification !
       return;
     }
      setUserDetails(result.data);
     setUserDetailsVisibility(false);
    });
  }

  async function deleteUser(id)
  {
   await userService.deleteUser(id).then((result)=>{
     if (result.status === StatusType.Fail)
     {
       console.log(result.data); // Change it with notification !
       return;
     }
      console.log(result.data); // Change it with notification !
    });
  }

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={7}
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
              <Results users={users} setUserDetailsVisibility={setUserDetailsVisibility} setUsers={setUsers} loadUserDetails={loadUserDetails} deleteUser={deleteUser} />
            )}
          </Grid>
          <Grid hidden={userDetailsVisibility}
            item
            lg={5}
            md={6}
            xs={12}
          >
            {!userDetailsVisibility && (
              <UserDetails initialValues={userDetails} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Users;
