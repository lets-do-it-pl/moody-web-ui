import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import  Recaptcha from 'react-recaptcha';

class AuthForm extends React.Component {
  constructor(props)
  {
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.recaptchaLoaded=this.recaptchaLoaded.bind(this);
    this.state={
      isVerified:false
    }
  }

  recaptchaLoaded(){
    console.log("Captcha has loaded.")
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    event.preventDefault();
    if(this.state.isVerified)
    {
      alert("Success!!")

      if(this.isLogin)
      {
        console.log(this.emailInput.value)
        console.log(this.passwordInput.value)
      }

      if(this.isSignup)
      {
        console.log(this.nameInput.value)
        console.log(this.surnameInput.value)
        console.log(this.emailInput.value)
        console.log(this.passwordInput.value)
        console.log(this.confirmPasswordInput.value)
      }
    }
    else{
      alert("Please verify!")
    }




  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
      nameLabel,
      nameInputProps,
      surnameInputProps,
      surnameLabel
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        {this.isSignup && (
          <FormGroup>
            <Label for={nameLabel}>{nameLabel}</Label>
            <Input innerRef={(node) => this.nameInput = node} {...nameInputProps} />
          </FormGroup>
        )}
        {this.isSignup && (
          <FormGroup>
            <Label for={surnameLabel}>{surnameLabel}</Label>
            <Input innerRef={(node) => this.surnameInput = node} {...surnameInputProps} />
          </FormGroup>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input innerRef={(node) => this.emailInput = node} {...usernameInputProps}/>
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input innerRef={(node) => this.passwordInput = node} {...passwordInputProps} />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input innerRef={(node) => this.confirmPasswordInput = node} {...confirmPasswordInputProps} />
          </FormGroup>
        )}

        {this.isLogin && (
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
              </Label>
            </FormGroup>
        )}
        <FormGroup className="Upper-Center">
          <Recaptcha
           sitekey="6LcJctkZAAAAADetAN2dDcvk3eE7vrKE-9-1j5RB"
           render="explicit"
           onLoadCallback={this.recaptchaLoaded}
           size="normal"
         />
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';


AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  nameLabel: PropTypes.string,
  nameInputProps: PropTypes.object,
  surnameLabel: PropTypes.string,
  surnameInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'Your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'Your Password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'Confirm Your Password',
  },
  nameLabel: 'First Name',
  nameInputProps: {
    type: 'text',
    placeholder: 'Your Name',
  },
  surnameLabel: 'Last Name',
  surnameInputProps: {
    type: 'text',
    placeholder: 'Your Lastname',
  },
  onLogoClick: () => {},
};

export default AuthForm;
