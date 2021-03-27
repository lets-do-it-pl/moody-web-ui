import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  makeStyles,
  Container,
  Avatar,
  Divider,
} from '@material-ui/core';
import "../../style.css";
import Export from './export/Export';
import Page from 'src/components/Page';
import { StatusType } from 'src/_types';
import CategoriesView from './CategoriesView';
import CreateCategoryForm from './CreateCategoryForm';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import CameraFrontIcon from '@material-ui/icons/CameraFront';
import CategoryDetailsView from './categoryDetails/CategoryDetailsView';
import CreateCategoryDetailsForm from './categoryDetails/CreateCategoryDetailsForm';
import { categoryDetailsService } from '../../_services/category.details.service';

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
  const [isVisible, setVisibility] = useState(false);
  const [id, setCategoryId] = useState();
  const [name, setCategoryName] = useState("");
  const [details, setDetails] = useState([]);

  const loadCategoryDetails = async (categoryId) => {
    const result = await categoryDetailsService.listCategoryDetails(categoryId);

    if (result.status === StatusType.Fail) {
      console.log(result.data);
      return;
    }

    setDetails(result.data);
  }

  const getId = async (categoryId, categoryName) => {
    await loadCategoryDetails(categoryId);
    setCategoryId(categoryId);
    setCategoryName(categoryName);
    setVisibility(true);
  }

  return (
    <Page
      className={classes.root}
      title="Category"
    >
      <Export/>
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
                <CategoriesView getCategoryId={getId} />
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
                action={ isVisible ? 
                  <CreateCategoryDetailsForm categoryId={id} /> : null
                } />
              <Divider />
              <CardContent>
                <CategoryDetailsView categoryDetails={details} categoryId={id}/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Category;
