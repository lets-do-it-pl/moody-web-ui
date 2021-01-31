import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  makeStyles,
  Container,
  Avatar,
  Divider
} from '@material-ui/core';
import "../../style.css"
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import CameraFrontIcon from '@material-ui/icons/CameraFront';
import Page from 'src/components/Page';
import CreateCategoryForm from './CreateCategoryForm';
import CategoryTable from './CategoryTable';
import CategoryDetailsTable from './categoryDetails/CategoryDetailsTable';
import CreateCategoryDetailsForm from './categoryDetails/CreateCategoryDetailsForm';
import { categoryDetailsService } from '../../_services/category.details.service';
import { StatusType } from 'src/_types';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  title: {
    fontSize: "25px"
  }
}));

const Category = () => {
  const classes = useStyles();
  const [id, setCategoryId] = useState();
  const [name, setCategoryName] = useState("");
  const [details, setDetails] = useState([]);

  const loadCategoryDetails = async () => {
    const result = await categoryDetailsService.listCategoryDetails(id);

    if (result.status === StatusType.Fail) {
      console.log(result.data);
      return;
    }

    setDetails(result.data);
  }

  const getId = async (categoryId, categoryName) => {
    await loadCategoryDetails();
    setCategoryId(categoryId);
    setCategoryName(categoryName);
  }

  return (
    <Page
      className={classes.root}
      title="Category"
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader
                classes={{
                  title: classes.title
                }}
                avatar={
                  <Avatar aria-label="recipe">
                    <AmpStoriesIcon />
                  </Avatar>
                }
                title="Categories"
                action={
                  <CreateCategoryForm />
                } />
              <Divider />
              <CardContent>
                <CategoryTable getCategoryId={getId} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader
                classes={{
                  title: classes.title
                }}
                avatar={
                  <Avatar aria-label="recipe">
                    <CameraFrontIcon />
                  </Avatar>
                }
                title={`${name} Category Details`}
                action={
                  <CreateCategoryDetailsForm categoryId={id} />
                } />
              <Divider />
              <CardContent>
                <CategoryDetailsTable categoryDetails={details}
                  categoryId={id} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Category;
