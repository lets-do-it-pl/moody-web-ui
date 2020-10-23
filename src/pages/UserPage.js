import Page from 'components/Page';
import React from 'react';
import { Button, Row, Col } from 'reactstrap';

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
         
          <Row>
            <Col> <Button className="float-right" color="success">New User</Button> </Col>
            <Col> <Button className="float-right" color="primary">Send Confirmation</Button></Col>
          </Row>

          <Row>
            <Col> User List </Col>
            <Col> 
              <Row>Detailed User List </Row>
              <Button className="float-right" color="primary">Save</Button>               
            </Col>
          </Row>

        </Page>
      );
    }
  }
  export default UserPage;
  