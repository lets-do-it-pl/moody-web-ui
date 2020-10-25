import Page from 'components/Page';
import React from 'react';



class ProfilePage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    
    return (
      <Page
        className="profile"
        title="Profile"
        breadcrumbs={[{ name: 'Profile', active: true }]}
      >

        <div>heyyo</div>


      </Page>
    );
  }
}
export default ProfilePage;
