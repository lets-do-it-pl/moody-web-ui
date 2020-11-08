import React, { Component } from 'react';
import axios from 'axios';


class Forgot extends Component {
  constructor(props) {
    super(props)

    this.state ={
      mail:' '
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
    const {mail} = this.state
    return (
      <div>
        <form onSubmit={this.submitHandler}>
        <h3>Forgot Password</h3>

        <div className="form-group">
          <label>Email</label>
          <input type = "text" name = "mail" value={mail}  className="form-control"  placeholder= "Please Enter Your Email"
                  onChange={this.changeHandler}/>
        </div>
        <button className="btn btn-primary btn-block">Send Mail</button>
      </form>
     </div>
    );
  }
}

export default Forgot;