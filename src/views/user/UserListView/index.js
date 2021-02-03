import React, { useEffect, useState,Suspense } from 'react';
import {
  Box,
  Container, FormHelperText,
  makeStyles, Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { userService } from '../../../_services';
import { StatusType } from '../../../_types';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UserListView = () =>
{
  const [loading,setLoading] = useState(true);
  const classes = useStyles();
  const [users,setUsers] = useState([]);

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

  return (
    <Page
      className={classes.root}
      title="Users"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          {loading ? (
            <Typography
              color="primary"
              variant="h5"
            >
              Loading...
            </Typography>
          ) : (
            <Results users={users} />
          )}
            </Box>
      </Container>
    </Page>
  );
};

export default UserListView;
