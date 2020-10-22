import Page from 'components/Page';
import React from 'react';

class UserPage extends React.Component {
    componentDidMount() {
      // this is needed, because InfiniteCalendar forces window scroll
      window.scrollTo(0, 0);
    }
  
    render() {
      
      return (
        <Page
          className="UserPage"
          title="User"
          breadcrumbs={[{ name: 'User', active: true }]}
        >
          
  
        </Page>
      );
    }
  }
  export default UserPage;
  