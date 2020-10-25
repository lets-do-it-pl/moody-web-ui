import React from 'react';
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
  buttonProps,
  ...restProps
}) {
  const bgColor = `bg-${color}`;
  const classes = classNames(bgColor, className);

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
            <Label className="text-dark" for="exampleEmail">Fullname</Label>
            <Input
              value={fullname}
            />
          </FormGroup>
          <FormGroup>
            <Label className="text-dark" for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder={email}            
              readOnly
            />
          </FormGroup>
        </Form>
        <Button className="btn-lg mt-3" color="secondary" {...buttonProps} />
      </CardBody>
    </Card>
  );
}

InfoCard.propTypes = {
  color: PropTypes.string,
  header: PropTypes.node,
  name: PropTypes.string, 
  email: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,
};

InfoCard.defaultProps = {
  color: 'gradient-secondary'
};

export default InfoCard;

