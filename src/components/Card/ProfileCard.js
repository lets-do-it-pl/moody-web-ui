import React from 'react';
import PropTypes from 'utils/propTypes';

import { Card, CardHeader, CardBody } from 'reactstrap';

import Avatar from 'components/Avatar';

import classNames from 'classnames';

const ProfileCard = ({
  color,
  header,
  avatar,
  avatarSize,
  className,
  buttonProps,
  ...restProps
}) => {
  const bgColor = `bg-${color}`;
  const classes = classNames(bgColor, className);

  return (
    <Card inverse className={classes} {...restProps}>
      {header && typeof header === 'string' ? (
        <CardHeader className={bgColor}>{header}</CardHeader>
      ) : (
        header
      )}
      <CardBody className="d-flex flex-wrap flex-column align-items-center justify-content-center">
        <Avatar size={avatarSize} src={avatar} />   {/*  */}
        {/* <Button color="primary" {...buttonProps} /> */}
      </CardBody>
    </Card>
  );
};

ProfileCard.propTypes = {
  color: PropTypes.string,
  header: PropTypes.node,
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.element,
};

ProfileCard.defaultProps = {
  color: 'gradient-secondary',
  avatarSize: 60,
};

export default ProfileCard;

