import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { accountService } from '../../../_services';
import { StatusType} from '../../../_types';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState([]);


 
  useEffect(() => {
    async function loadAccount() {
      const result = await accountService.getAccount();

      if (result.status === StatusType.Fail) {
       
        return;
      }

      setAccount(result.data);
      setLoading(false);
    }

    loadAccount();
  }, []); 

  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >{loading ? (
          <Typography
            color="primary"
            variant="h5"
          >
            Loading...
          </Typography>
        ) : (
            <>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
              >
                <Profile account={account} />
              </Grid>
              <Grid
                item
                lg={8}
                md={6}
                xs={12}
              >
                <ProfileDetails account={account} />
              </Grid>
            </>
          )}
        </Grid>

      </Container>
    </Page>
  );
};

export default Account;
