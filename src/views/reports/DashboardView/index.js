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
  const [averageRegisteredClientCount, setAverageRegisteredClientCount] = useState(0);
  const [totalCategoryCount, setTotalCategoryCount] = useState(0);
  const [totalCategoryDetailCount, setTotalCategoryDetailCount] = useState(0);
  const [totalRegisteredClientCount, setTotalRegisteredClientCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      var result = await dashboardService.getDashboardWidgets();

      if (result.status !== StatusType.Success) {
        console.log(result.data);
        return;
      }

      result.data.forEach(element => {
        switch (element.name) {
          case "TotalCategoryCount":
            setTotalCategoryCount(element.totalNumber);
            break;
          case "TotalCategoryDetailCount":
            setTotalCategoryDetailCount(element.totalNumber);
            break;
          case "TotalRegisteredClientCount":
            setTotalRegisteredClientCount(element.totalNumber);
            break;
          case "AverageRegisteredClientCount":
            setAverageRegisteredClientCount(element.totalNumber);
            break;
          default:
            console.log(`${element.name} can not be matched!`);
        }
      });
    }
    fetchData();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <CategoryCount TotalNumber={totalCategoryCount} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <CategoryDetailsCount TotalNumber={totalCategoryDetailCount} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MobileClientCount TotalNumber={totalRegisteredClientCount} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <AverageDailyClientRegister TotalNumber={averageRegisteredClientCount} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
