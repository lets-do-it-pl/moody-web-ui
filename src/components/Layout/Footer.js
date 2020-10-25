import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          Download the latest version on Android or iOS, Let's roll with <SourceLink>MOODY</SourceLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
