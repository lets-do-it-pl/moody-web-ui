import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CategoryCount from './CategoryCount';
import MobileClientCount from './MobilClientCount';
import CategoryDetails from './CategoryDetails';
import AverageDailyClientRegister from './AverageDailyClientRegister';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <CategoryCount />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <CategoryDetails />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <MobileClientCount />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <AverageDailyClientRegister />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;