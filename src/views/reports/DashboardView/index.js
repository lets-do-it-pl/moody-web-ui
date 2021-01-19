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

const widget=[
  {'Name': 'Category','TotalNumber':'5'},
  {'Name': 'AverageDailyClient','TotalNumber':'5'},
  {'Name': 'CategoryDetails','TotalNumber':'5'},
  {'Name': 'MobilClient','TotalNumber':'5'}
]
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
            <CategoryCount TotalNumber = {widget[0].TotalNumber} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <CategoryDetails TotalNumber = {widget[1].TotalNumber}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <MobileClientCount TotalNumber = {widget[2].TotalNumber} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <AverageDailyClientRegister TotalNumber = {widget[3].TotalNumber} />
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