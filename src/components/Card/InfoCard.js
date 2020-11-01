import React, { useState } from 'react';
import PropTypes from 'utils/propTypes';

import classNames from 'classnames';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';



function InfoCard({
  color,
  header,
  fullname,
  email,
  className,
  userType,
  password,
  buttonProps,
  ...restProps
}) {
  const bgColor = `bg-${color}`;
  const classes = classNames(bgColor, className);

  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  return (
    <Card inverse className={classes} {...restProps}>
      {header && typeof header === 'string' ? (
        <CardHeader className="text-dark">{header}</CardHeader>
      ) : (
          header
        )}
      <CardBody className="d-flex flex-wrap flex-column align-items-center justify-content-center">
        <Form>
          <FormGroup>
            <Label className="text-dark" for="name">Fullname</Label>
            <Input
              value={fullname}
            />
          </FormGroup>
          <FormGroup>
            <Label className="text-dark" for="email">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder={email}            
              readOnly
            />
          </FormGroup>
          <FormGroup>
            <Label className="text-dark" for="password">New Password</Label>
            <Input
              type="password"
              name="password"
              value={pass1}
              onChange={event => setPass1(event.target.value)}    //if value changes, pass1 also changes
              placeholder="Enter your new password"
            />
          </FormGroup>
          <FormGroup>
            <Label className="text-dark" for="confirmPassword">Confirm Your New Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={pass2}
              onChange={event => setPass2(event.target.value)}    //if value changes, pass2 also changes
              placeholder="Re-enter your password"
            />
          </FormGroup>
          <FormGroup>
            <Label className="text-dark" for="userType">User Type</Label>
            <Input
              type="email"
              name="userType"
              placeholder={userType}            
              readOnly
            />
          </FormGroup>
        </Form>
        <Button
          disabled={pass1.length>1 && pass1 !== pass2}    //checks pass1 and pass2 is equal or not. if they are not, disables the button
          className="btn-lg mt-3" 
          color="secondary" {...buttonProps} />   
      </CardBody>
    </Card>
  );
}

InfoCard.propTypes = {
  color: PropTypes.string,
  header: PropTypes.node,
  name: PropTypes.string, 
  email: PropTypes.string, 
  userType: PropTypes.string,
  password: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,
};

InfoCard.defaultProps = {
  color: 'gradient-secondary',
  password: ""
};

export default InfoCard;

