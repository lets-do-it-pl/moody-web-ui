import Page from 'components/Page';
import React from 'react';

class CategoryPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    
    return (
      <Page
        className="CategoryPage"
        title="Category"
        breadcrumbs={[{ name: 'Category', active: true }]}
      >
        

      </Page>
    );
  }
}
export default CategoryPage;
