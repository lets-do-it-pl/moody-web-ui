import Page from 'components/Page';
import React from 'react';

import ProfileCard from 'components/Card/ProfileCard';
import InfoCard from 'components/Card/InfoCard';

//import userImage from 'assets/img/users/default_user2.png';

import {
  Col,
  Row,
} from 'reactstrap';



class ProfilePage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  constructor(props) {
    super(props);
    this.state = {
      fullname: "Default User",           //user name
      email: "default@deneme.com",        //user email
      userType: "Admin",                  //user type
      //avatar: userImage                   //user icon(default icon is set to same icon)
    };
  }

  render() {
    
    return (
      <Page
        className="ProfilePage"
        title="Page"
        breadcrumbs={[{ name: 'User', active: true }]}
      >

        <Row>
          <Col lg="6" md="12" sm="12" xs="12">
            <ProfileCard
              color="gradient-white"
              avatarSize={400}
              style={{ height: 500 }}
              avatar={this.state.avatar}       
            />
          </Col>

          <Col lg="6" md="12" sm="12" xs="12">
            <InfoCard
              color="gradient-white"
              header="Information"
              fullname={this.state.fullname}    
              email={this.state.email}          
              userType={this.state.userType}    
              buttonProps={{
                children: 'Save',
              }}
              style={{ height: 500 }}
            />
          </Col>

        </Row>

      </Page>
    );
  }
}
export default ProfilePage;
