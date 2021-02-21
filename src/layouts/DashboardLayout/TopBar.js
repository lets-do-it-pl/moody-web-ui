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
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SearchResultDialog from './SearchResultDialog';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const logout = () => {
    authenticationService.logout();
    navigate('/login', { replace: true });
  };

  const [open, setOpen] = React.useState(false);
  const [selectedOption,setSelectedOption] = useState({id:0,image:'',name:''});
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = useState(false);

  async function populateOptions(searchKey) {

    await sleep(1e3);
    const response = await searchService.generalSearch(searchKey);

    console.log(response.data);

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
            onChange={(event,value)=>{ 
              if(value){
                setSelectedOption({id:value.id,image:'',name:value.name})
                setOpenDialog(true);
              }
            }}
            onInputChange={async (event, value) => {
              setLoading(true);
              await populateOptions(value);
            }}
            renderOption={(option, index) => {
              return (
                <>
                  {
                    {
                      'Category': <AmpStoriesIcon />,
                      'User': <SupervisorAccountIcon />
                    }[option.type]
                  }
                  {` ${option.name}`}
                </>
              );
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
          {selectedOption.name &&
        <SearchResultDialog openDialog={openDialog} setOpenDialog={setOpenDialog} selectedOption={selectedOption}/>
          }
          <IconButton color="inherit" onClick={logout}>
            <InputIcon />
          </IconButton>
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
