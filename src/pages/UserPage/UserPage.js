import React from 'react';
import UserTableComponent from './UserTableComponent'
import { Button, Row, Col } from 'reactstrap';

class UserPage extends React.Component {    

  render() {
    return (
      <div>
         <Row>
            <Col> <Button className="float-right" color="success">New User</Button> </Col>
            <Col> <Button className="float-right" color="primary">Send Confirmation</Button></Col>
          </Row>

          <Row>
            <Col> User List <UserTableComponent/> </Col>
            <Col> 
              <Row>Detailed User List </Row>
              <Button className="float-right" color="primary">Save</Button>               
            </Col>
          </Row>
       
      </div>
    )
  }
  }
  export default UserPage;
  