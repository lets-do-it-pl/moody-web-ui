import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  TextField,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import { authenticationService, searchService } from 'src/_services';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const navigate = useNavigate();

  const logout = () => {
    authenticationService.logout();
    navigate('/login', { replace: true });
  };

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = useState(false);

  async function populateOptions(searchKey) {

    await sleep(1e3);
    const response = await searchService.generalSearch(searchKey);

    setOptions(response.data);
    setLoading(false);
  }

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
      setLoading(false);
    }
  }, [open]);

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <Autocomplete
            id="search"
            style={{
              width: 300,
              backgroundColor: 'white',
              borderRadius: 4,
            }}
            open={open}
            onOpen={() => {
              setOpen(true);
              ;
            }}
            onClose={() => {
              setOpen(false);
            }}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            onInputChange={async (event, value) => {
              setLoading(true);
              await populateOptions(value);
            }}
            renderInput={(params) => (
              <TextField
                style={{}}
                {...params}
                label="Search..."
                variant="filled"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Hidden>
        <Hidden mdDown>
          <IconButton color="inherit" onClick={logout}>
            <InputIcon />
          </IconButton>
        </Hidden>

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
