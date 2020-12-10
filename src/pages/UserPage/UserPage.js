import React from 'react';
import UserTableComponent from './UserTableComponent'
//import UserDetailsTableComponent from './UserDetailsTableComponent'
import { Button, Row, Col } from 'reactstrap';
import Container from './CreateUserPopup/Container';
import ContainerResetPassword from './ResetPasswordPopup/ContainerResetPassword';
import modal from './modal.css'





const UserPage  = () => {

  const triggerTextUser = 'New User';
  const triggerTextReset = 'Reset Password';

  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  };

    return (
      <div>
        <Row>
          <Col> <Container triggerText={triggerTextUser} onSubmit={onSubmit} /> </Col>
          <Col> <Button className="float-right" color="primary">Send Confirmation</Button> </Col>
        </Row>

        <Row>
          <Col> <UserTableComponent /> </Col>
          <Col>
            <Row>Detailed User List</Row>
          </Col>
          <Col>  <ContainerResetPassword triggerText={triggerTextReset} onSubmit={onSubmit} /> </Col>
        </Row>

      </div>
    )
  }

export default UserPage;
