import React, {useEffect, useRef} from 'react';
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
import {categoryDetailsService} from '../../_services/categoryDetailsService';


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
  const [name, setCategoryName] = React.useState();
  const [details, setDetails] = React.useState([]);
  const mounted = useRef();
  
  useEffect(() => {
  if (!mounted.current) {
    mounted.current = true;
  } else {
    categoryDetailsService.listCategoryDetails(id).then(result => 
      setDetails(result.data)
    );
  }
  });
  
  const getId = (categoryId, categoryName) =>{
    categoryDetailsService.listCategoryDetails(categoryId).then(result => 
          setDetails(result.data)
    );
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
                classes = {{
                  title : classes.title
                }}
                title = "Category"
                action={
                  <IconButton>
                     <p className = "fontStyle">Create a new Category</p>
                    <CreateCategoryForm/>
                  </IconButton>
                }/>
              <CardContent>
                <CategoryTable getCategoryId = {getId} />
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
              />
              <CardContent>
                <CategoryDetailsTable categoryDetails = {details} 
                                      categoryId = {id}
                                      categoryName = {name}/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </Page>
  );
};

export default Category;