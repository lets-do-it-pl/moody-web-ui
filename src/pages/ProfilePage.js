import Page from 'components/Page';
import React from 'react';

import ProfileCard from 'components/Card/ProfileCard';
import InfoCard from 'components/Card/InfoCard';

import {
  Col,
  Row,
} from 'reactstrap';


class ProfilePage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  state = {
    pass1:"",
    pass2:""
  };

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
            />
          </Col>

          <Col lg="6" md="12" sm="12" xs="12">
            <InfoCard
              color="gradient-white"
              header="Information"
              fullname="Başkan Dayı"
              email="blabla@deneme.com"
              userType="Admin"
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
