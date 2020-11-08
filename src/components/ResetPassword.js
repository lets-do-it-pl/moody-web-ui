import React, { Component } from 'react';
import axios from 'axios';

class ResetPassword extends Component {
  constructor(props) {
    super(props)

    this.state ={
      reset:' ',
      confirm:''
    }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
    axios.post('https://my-json-server.typicode.com/typicode/demo/posts', this.state)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    const {reset,confirm} = this.state
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <h3>Forgot Password</h3>

          <div className="form-group">
            <label>Password</label>
            <input type = "text" name = "reset" value={reset}  className="form-control"  placeholder= "Password"
                   onChange={this.changeHandler}/>
          </div>
          <div className="form-group">
            <label>ConfirmPassword</label>
            <input type = "text" name = "confirm" value={confirm}  className="form-control"  placeholder= "Confirm Password"
                   onChange={this.changeHandler}/>
          </div>
          <button className="btn btn-primary btn-block">Reset Password</button>
        </form>
      </div>
    );
  }
}

export default ResetPassword;