import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CategoryCount from './CategoryCount';
import MobileClientCount from './MobilClientCount';
import CategoryDetailsCount from './CategoryDetails';
import AverageDailyClientRegister from './AverageDailyClientRegister';
import { dashboardService } from 'src/_services';
import { StatusType } from 'src/_types';

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
  const [widgets, setWidgets] = useState([]);

  useEffect(async () => {
    var result = await dashboardService.getDashboardWidgets();

    if (result.status !== StatusType.Success) {
      console.log(result.data);
      return;
    }

    setWidgets(result.data)
  })

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            {/* <CategoryCount TotalNumber={widgets[0].TotalNumber} /> */}
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            {/* <CategoryDetailsCount TotalNumber={widgets[1].TotalNumber} /> */}
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            {/* <MobileClientCount TotalNumber={widgets[2].TotalNumber} /> */}
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            {/* <AverageDailyClientRegister TotalNumber={widgets[3].TotalNumber} /> */}
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;