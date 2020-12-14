import React from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';
import {Grid, 
        Card, 
        CardHeader, 
        CardContent, 
        IconButton} from '@material-ui/core';
import CreateCategoryForm from '../components/Layout/Category/CreateCategoryForm';
import CategoryModal from '../components/Layout/Category/CategoryModal';
import CategoryTable from '../components/Layout/Category/CategoryTable';

const styles = theme => ({
  title: {
    fontSize : '30px',
    fontWeight : "500",
    fontFamily : 'poppins',
  },
});

class CategoryPage extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { classes } = this.props;
    return (
      <Page
        className="CategoryPage"
        title="Category"
        breadcrumbs={[{ name: 'Category', active: true }]}
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
                    <CategoryModal
                      title = "Create"
                      content = {<CreateCategoryForm/>}
                      icon = {<AddIcon/>}
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
                    <AddIcon/>
                  </IconButton>
                }/>
              <CardContent>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Page>
    );
  }
}

CategoryPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryPage);
