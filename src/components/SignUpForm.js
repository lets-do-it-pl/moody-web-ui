import React, { useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { TextField, Button, Grid, FormLabel } from '@material-ui/core';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';
import loadjs from 'loadjs';

function SignUpForm(props)
{

  loadjs('https://www.google.com/recaptcha/api.js');

  const initalState = {
    firstName: {
      value: '',
      hasErrors: false,
      message: '',
    },
    lastName: {
      value: '',
      hasErrors: false,
      message: '',
    },
    username: {
      value: '',
      hasErrors: false,
      message: '',
      isUnique: false,
      checkCount: 0,
    },
    email: {
      value: '',
      hasErrors: false,
      message: '',
      isUnique: false,
      checkCount: 0,
    },
    password: {
      value: '',
      hasErrors: false,
      message: '',
    },
    submitCount: 0,
    captcha: {
      isVerified: false,
      showError: false,
    },
  };

  function ourReducer(draft, action)
  {
    switch (action.type)
    {
      case 'firstNameImmediately':
        draft.firstName.hasErrors = false;
        draft.firstName.value = action.value;
        return;

      case 'firstNameBeforeSubmit':
        if (!draft.firstName.value)
        {
          draft.firstName.hasErrors = true;
          draft.firstName.message = 'Required';
        }
        return;

      case 'lastNameImmediately':
        draft.lastName.hasErrors = false;
        draft.lastName.value = action.value;
        return;

      case 'lastNameBeforeSubmit':
        if (!draft.lastName.value)
        {
          draft.lastName.hasErrors = true;
          draft.lastName.message = 'Required';
        }
        return;

      case 'usernameImmediately':
        draft.username.hasErrors = false;
        draft.username.value = action.value;
        if (draft.username.value.length > 30)
        {
          draft.username.hasErrors = true;
          draft.username.message = 'Username can not exceed 30 characters';
        }
        if (draft.username.value && !/^([a-zA-Z0-9]+)$/.test(draft.username.value))
        {
          draft.username.hasErrors = true;
          draft.username.message = 'Username can only contain letters and numbers';
        }
        return;

      case 'usernameAfterDelay':
        if (draft.username.value.length < 3)
        {
          draft.username.hasErrors = true;
          draft.username.message = 'Username must be at least three characters';
        }
        if (!draft.hasErrors)
        {
          draft.username.checkCount++;
        }
        return;

      case 'usernameUniqueResults':
        if (action.value)
        {
          draft.username.hasErrors = true;
          draft.username.isUnique = false;
          draft.username.message = 'Username is already taken';
        } else
        {
          draft.username.isUnique = true;
        }
        return;

      case 'emailImmediately':
        draft.email.hasErrors = false;
        draft.email.value = action.value;

        return;

      case  'emailAfterDelay':
        if (!/^\S+@\S+$/.test(draft.email.value) || !draft.email.value)
        {
          draft.email.hasErrors = true;
          draft.email.message = 'You must provide a valid email adress';
        }
        if (!draft.email.hasErrors && !action.noRequest)
        {
          draft.email.checkCount++;
        }
        return;

      case 'emailUniqueResults':
        if (action.value)
        {
          draft.email.hasErrors = true;
          draft.email.isUnique = false;
          draft.email.message = 'Email is already taken';
        } else
        {
          draft.email.isUnique = true;
        }
        return;

      case 'passwordImmediately':
        draft.password.hasErrors = false;
        draft.password.value = action.value;
        if (draft.password.value.length > 50)
        {
          draft.password.hasErrors = true;
          draft.password.message = 'Password can not exceed 50 characters';
        }
        return;

      case 'passwordAfterDelay':
        if (draft.password.value.length < 8)
        {
          draft.password.hasErrors = true;
          draft.password.message = 'Password must be at least 8 characters';
        }
        return;

      case 'verifyCaptcha':
        draft.captcha.isVerified = true;
        draft.captcha.showError = false;
        return;

      case'captchaBeforeSubmit':
        if (!draft.captcha.isVerified)
        {
          draft.captcha.showError = true;
        }
        return;

      case 'submitForm':
        if (!draft.username.hasErrors && draft.username.isUnique
          && !draft.email.hasErrors && draft.email.isUnique
          && !draft.password.hasErrors
          && draft.captcha.isVerified
          && !draft.firstName.hasErrors
          && !draft.lastName.hasErrors)
        {
          draft.submitCount++;
        }
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initalState);


  useEffect(() =>
  {
    if (state.username.checkCount)
    {
      const Request = Axios.CancelToken.source();

      async function fetchResults()
      {
        try
        {
          const response = await Axios.post('/doesUsernameExist',
            { username: state.username.value },
            { cancelToken: Request.token });
          dispatch({ type: 'usernameUniqueResults', value: response.data });
        } catch (e)
        {
          console.log('There was a problem or the request cancelled.');
        }
      }

      fetchResults();
      return () => Request.cancel();
    }

  }, [state.username.checkCount]);


  useEffect(() =>
  {
    if (state.email.checkCount)
    {
      const Request = Axios.CancelToken.source();

      async function fetchResults()
      {
        try
        {
          const response = await Axios.post('/doesEmailExist',
            { email: state.email.value },
            { cancelToken: Request.token });
          dispatch({ type: 'emailUniqueResults', value: response.data });
        } catch (e)
        {
          console.log('There was a problem or the request cancelled.');
        }
      }

      fetchResults();
      return () => Request.cancel();
    }

  }, [state.email.checkCount]);


  useEffect(() =>
  {
    if (state.username.value)
    {
      const delay = setTimeout(() => dispatch({ type: 'usernameAfterDelay' }), 800);
      return () => clearTimeout(delay);
    }

  }, [state.username.value]);

  useEffect(() =>
  {
    if (state.email.value)
    {
      const delay = setTimeout(() => dispatch({ type: 'emailAfterDelay' }), 800);
      return () => clearTimeout(delay);
    }

  }, [state.email.value]);

  useEffect(() =>
  {
    if (state.password.value)
    {
      const delay = setTimeout(() => dispatch({ type: 'emailAfterDelay' }), 800);
      return () => clearTimeout(delay);
    }

  }, [state.password.value]);


  useEffect(() =>
  {
    if (state.submitCount)
    {
      const Request = Axios.CancelToken.source();

      async function fetchResults()
      {
        try
        {
          const response = await Axios.post('/api/user',
            {
              username: state.username.value,
              email: state.email.value,
              password: state.password.value,
              surname: state.lastName.value,
              name: state.firstName.value,
            },
            { cancelToken: Request.token });
        } catch (e)
        {
          console.log('There was a problem or the request cancelled.');
          console.log(e.response);
        }
      }

      fetchResults();
      return () => Request.cancel();
    }

  }, [state.submitCount]);

  function handleSubmit(e)
  {
    e.preventDefault();
    dispatch({ type: 'usernameImmediately', value: state.username.value });
    dispatch({ type: 'usernameAfterDelay', value: state.username.value, noRequest: true });

    dispatch({ type: 'emailImmediately', value: state.email.value });
    dispatch({ type: 'emailAfterDelay', value: state.email.value, noRequest: true });

    dispatch({ type: 'passwordImmediately', value: state.password.value });
    dispatch({ type: 'passwordAfterDelay', value: state.password.value });

    dispatch({ type: 'firstNameBeforeSubmit', value: state.firstName.value });

    dispatch({ type: 'lastNameBeforeSubmit', value: state.lastName.value });

    dispatch({ type: 'captchaBeforeSubmit' });

    dispatch({ type: 'submitForm' });
  }

  return (

    <form onSubmit={handleSubmit} className={props.classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={state.firstName.hasErrors}
            helperText={state.firstName.hasErrors === true ? state.firstName.message : ''}
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            size="small"
            id="firstName"
            label="First Name"
            autoFocus
            onChange={e => dispatch({ type: 'firstNameImmediately', value: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={state.lastName.hasErrors}
            helperText={state.lastName.hasErrors === true ? state.lastName.message : ''}
            variant="outlined"
            required
            fullWidth
            size="small"
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lname"
            onChange={e => dispatch({ type: 'lastNameImmediately', value: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={state.username.hasErrors}
            helperText={state.username.hasErrors === true ? state.username.message : ''}
            variant="outlined"
            required
            fullWidth
            size="small"
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={e => dispatch({ type: 'usernameImmediately', value: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={state.email.hasErrors}
            helperText={state.email.hasErrors === true ? state.email.message : ''}
            variant="outlined"
            required
            fullWidth
            size="small"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={e => dispatch({ type: 'emailImmediately', value: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={state.password.hasErrors}
            helperText={state.password.hasErrors === true ? state.password.message : ''}
            variant="outlined"
            required
            fullWidth
            size="small"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => dispatch({ type: 'passwordImmediately', value: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} className="center-recapthca">
          <Recaptcha
            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
            render="explicit"
            verifyCallback={() => dispatch({ type: 'verifyCaptcha' })}
          />
          {state.captcha.showError === true ? <FormLabel error>Please Verify ReCaptcha</FormLabel> : null}
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={props.classes.submit}
      >
        Sign Up
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link to='/login' variant="body2">
            Already have an account? Login
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default SignUpForm;