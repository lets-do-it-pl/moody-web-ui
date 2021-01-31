import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Grid,
  makeStyles,
  Container,
  Button,
  Avatar,
  Divider
} from '@material-ui/core';
import "../../style.css"
import AddIcon from '@material-ui/icons/Add';
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
  },
  button: {
    margin: theme.spacing(1),
  }
}));

const Category = () => {
  const classes = useStyles();
  const [id, setCategoryId] = React.useState();
  const [name, setCategoryName] = React.useState("");
  const [details, setDetails] = React.useState([]);

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
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    startIcon={< AddIcon />}
                  >
                    Add Category
                    </Button>
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
                  // <IconButton>
                  //   <p className="fontStyle">New Category Detail</p>
                  //   <CreateCategoryDetailsForm categoryId={id} />
                  // </IconButton>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    startIcon={< AddIcon />}
                  >
                    Add Category Detail
                   </Button>
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
