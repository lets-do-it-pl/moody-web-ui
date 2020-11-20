import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PropTypes from 'utils/propTypes';
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

  const URL = 'http://localhost:1234/api/users/1'

  const [userDetails, setUserDetails] = useState([])

  /* const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }); */
  
  const renderSwitch = (param) => {
    switch(param) {
      case 1:
        return 'Standart';
      case 2:
        return 'Admin';
      default:
        return 'None';
    }
  }

  useEffect(() => {
      getData()
  }, [])

  const getData = async () => {

    const response = await axios.get(URL)
    console.log('response', response)
    setUserDetails(response.data)
  }

  const bgColor = `bg-${color}`;  
  const classes = classNames(bgColor, className);

  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  console.log(userDetails.id);

  

  return (
    <Card inverse className={classes} {...restProps}>
      <CardContent className="d-flex flex-wrap flex-column align-items-center justify-content-center">
          <TextField
            id="outlined-Name"
            label="Name"
            defaultValue={userDetails.name} 
            variant="outlined"
            fullWidth
            style={{ margin: 8 }}
          />
          <TextField
          id="outlined-Email"
          label="Email"
          defaultValue={userDetails.email} 
          InputProps={{
            readOnly: true,
          }}
          fullWidth
          style={{ margin: 8 }}
          variant="outlined"
          />
          <TextField
            id="outlined-pass1"
            label="New Password"
            defaultValue={pass1} 
            variant="outlined"
            fullWidth
            style={{ margin: 8 }}
            onChange={event => setPass1(event.target.value)}  //if value changes, pass1 also changes
          />
          <TextField
            id="outlined-pass2"
            label="Confirm Your New Password"
            defaultValue={pass2} 
            variant="outlined"
            fullWidth
            style={{ margin: 8 }}
            onChange={event => setPass2(event.target.value)}  //if value changes, pass2 also changes
          />
          <TextField
          id="outlined-UserType"
          label="User Type"
          defaultValue={renderSwitch(userDetails.userType)}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
          fullWidth
          style={{ margin: 8 }}
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

