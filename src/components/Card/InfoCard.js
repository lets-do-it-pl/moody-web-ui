//import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PropTypes from 'utils/propTypes';
import API from '../../api/API';

import {
  Button,
  TextField,
  Card,
  CardActions,
  CardContent
} from '@material-ui/core';


import classNames from 'classnames';

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

  //const URL = 'http://localhost:1234/api/user/7'

  const [userDetails, setUserDetails] = useState([])
  
  const renderSwitch = (param) => {
    switch(param) {
      case 'S':
        return 'Standart';
      case 'A':
        return 'Admin';
      default:
        return 'None';
    }
  }

  const userData = API.GetUser;

  useEffect(() => {
      setUserDetails([userData])
      userData()
      //getData()
  }, [])
  
  /* const getData = async () => {
    const response = await axios.get(URL)
    console.log('response', response)
    setUserDetails(response.data)
  }  */

  const bgColor = `bg-${color}`;  
  const classes = classNames(bgColor, className);

  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  console.log(userDetails);

  return (
    <Card className={classes} {...restProps}>
      <CardContent>
          <TextField
            id="outlined-Name"
            label="Name"
            value={userDetails.fullName}
            variant="outlined"
            fullWidth
            style={{ margin: 8 }}
            color="secondary"
          />
          <TextField
            id="outlined-Email"
            label="Email"
            value={userDetails.email} 
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            style={{ margin: 8 }}
            variant="outlined"
            color="secondary"
          />
          <TextField
            id="outlined-pass1"
            label="New Password"
            defaultValue={pass1} 
            variant="outlined"
            type="password"
            fullWidth
            style={{ margin: 8 }}
            onChange={event => setPass1(event.target.value)}  //if value changes, pass1 also changes
            color="secondary"
          />
          <TextField
            id="outlined-pass2"
            label="Confirm Your New Password"
            defaultValue={pass2} 
            variant="outlined"
            type="password"
            fullWidth
            style={{ margin: 8 }}
            onChange={event => setPass2(event.target.value)}  //if value changes, pass2 also changes
            helperText={(pass1 !== pass2) ? "Passwords are not match!" : null}
            color="secondary"
            error={pass1.length>1 || pass1 !== pass2}
          />
          <TextField
            id="outlined-UserType"
            label="User Type"
            value={renderSwitch(userDetails.userType)}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            fullWidth
            style={{ margin: 8 }}
            color="secondary"
          />
        </CardContent>
        <CardActions style={{justifyContent: 'center'}}>
        <Button
          variant="outlined"
          disabled={pass1.length>1 || pass1 !== pass2}    //checks pass1 and pass2 is equal or not. if they are not, disables the button
          size="large"
          color="secondary" {...buttonProps} /> 
          
        </CardActions>
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

