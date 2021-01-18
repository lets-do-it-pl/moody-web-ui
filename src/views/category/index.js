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
import AddIcon from '@material-ui/icons/Add';
import CreateCategoryForm from './CreateCategoryForm';
import CategoryModal from './common/CategoryModal';
import CategoryTable from './CategoryTable';


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

  return (
    <Page
      className={classes.root}
      title="Category"
    >   
      <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader 
                classes = {{
                  title : classes.title
                }}
                title = "Category"
                action={
                  <IconButton>
                    <p className = "fontStyle">Create a new Category</p>
                    <CategoryModal
                      title = "Create"
                      content = {<CreateCategoryForm/>}
                      icon = {<AddIcon className = {classes.add}/>}
                    />
                  </IconButton>
                }/>
              <CardContent>
                <CategoryTable/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader 
                classes = {{
                  title : classes.title
                }}
                title = "Category Details"
                action={
                  <IconButton>
                    <p className = "fontStyle">Create a new Category Detail</p>
                    <AddIcon className = {classes.add}/>
                  </IconButton>
                }/>
              <CardContent>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </Page>
  );
};

export default Category;