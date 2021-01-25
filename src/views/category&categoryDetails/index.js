import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Grid,
  makeStyles
} from '@material-ui/core';
import "../../style.css"
import Page from 'src/components/Page';
import CreateCategoryForm from './category/CreateCategoryForm';
import CategoryTable from './category/CategoryTable';
import CategoryDetailsTable from './categoryDetails/CategoryDetailsTable';
import CreateCategoryDetailsForm from './categoryDetails/CreateCategoryDetailsForm';
import { categoryDetailsService } from '../../_services/categoryDetailsService';
import { StatusType } from 'src/_types';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  title: {
    fontSize: "25px"
  },
  add: {
    color: "green"
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

  // useEffect(() => {
  //   if (!mounted.current) {
  //     mounted.current = true;
  //
  //   } else {
  //     loadCategoryDetails();
  //   }
  // }, [loadCategoryDetails]);

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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader
              classes={{
                title: classes.title
              }}
              title="Category"
              action={
                <IconButton>
                  <p className="fontStyle">New Category</p>
                  <CreateCategoryForm />
                </IconButton>
              } />
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
              title={`${name} Category Details`}
              action={
                <IconButton>
                  <p className="fontStyle">New Category Detail</p>
                  <CreateCategoryDetailsForm categoryId={id} />
                </IconButton>
              } />
            <CardContent>
              <CategoryDetailsTable categoryDetails={details}
                categoryId={id} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Category;
