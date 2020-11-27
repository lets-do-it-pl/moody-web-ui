import Page from 'components/Page';
import React from 'react';
import PropTypes from 'prop-types';
import CategoryTable from 'components/Layout/Category/CategoryTable';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CreateCategoryModal from 'components/Layout/Category/CreateCategoryModal';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/styles';

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
                    <CreateCategoryModal/>
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
