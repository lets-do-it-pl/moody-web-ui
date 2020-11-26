import React from 'react';
import {
  CssBaseline,
  Typography,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo200Image from '../assets/img/logo/logo_200.png';
import SignUpForm from '../components/SignUpForm';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

export default function SignUpPage()
{
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Link to='/'>
          <img
               src={logo200Image}
               className="rounded"
               style={{ width: 60, height: 60, cursor: 'pointer', marginBottom:10 }}
               alt="logo"/>
        </Link>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <SignUpForm classes={classes}/>
      </div>
    </Container>
  );
}