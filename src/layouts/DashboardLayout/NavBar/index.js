import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon
} from 'react-feather';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import NavItem from './NavItem';

import { authenticationService } from 'src/_services';

const user = {
  avatar: authenticationService.currentUserValue !== null &&
    authenticationService.currentUserValue !== {} &&
    authenticationService.currentUserValue.profileImage !== null &&
    authenticationService.currentUserValue.profileImage !== undefined &&
    authenticationService.currentUserValue.profileImage !== "" ?
    authenticationService.currentUserValue.profileImage :
    '/static/images/avatars/default.png',
  name: authenticationService.currentUserValue !== null &&
    authenticationService.currentUserValue !== {} ?
    authenticationService.currentUserValue.fullName :
    ""
};

const menuItems = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    role: 'Standard'
  },
  {
    href: '/app/users',
    icon: SupervisorAccountIcon,
    title: 'Users',
    role: 'Admin'
  },
  {
    href: '/app/category',
    icon: AmpStoriesIcon,
    title: 'Categories',
    role: 'Standard'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account',
    role: 'Standard'
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings',
    role: 'Standard'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {authenticationService.currentUserRole === 'A' ?
            menuItems.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />))
            :
            menuItems.filter(i=>i.role==='Standard').map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
