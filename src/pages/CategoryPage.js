import Page from 'components/Page';
import React from 'react';
import Table from 'components/Layout/Category/Table';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Popup from 'components/Layout/Category/Popup';
import {AddIcon} from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class CategoryPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  constructor (props){
    super(props);
    this.state = {
      showModal : false
    }
  }

  render() {
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
                title = "Categories" 
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Table/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title = "Category Details"/>
              <CardContent>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Popup/>
      </Page>
    );
  }
}
export default CategoryPage;
