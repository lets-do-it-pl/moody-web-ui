import React from 'react';
import UserTableComponent from './UserTableComponent'
//import UserDetailsTableComponent from './UserDetailsTableComponent'
import { Button, Row, Col } from 'reactstrap';
import Container from './CreateUserPopup/Container';
import modal from './modal.css'





const UserPage  = () => {

  const triggerText = 'New User';
  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  };

    return (
      <div>
        <Row>
          <Col>  <Container triggerText={triggerText} onSubmit={onSubmit} />
          </Col>
          <Col> <Button className="float-right" color="primary">Send Confirmation</Button></Col>
        </Row>

        <Row>
          <Col> <UserTableComponent /> </Col>
          <Col>
            <Row>Detailed User List</Row>
            <Button className="float-right" color="primary">Save</Button>
          </Col>
        </Row>

      </div>
    )
  }

export default UserPage;
