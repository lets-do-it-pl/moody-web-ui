import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
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
    axios.post('http://localhost:1234/api/clients/email/forgot', this.state)
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
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
       <form onSubmit={this.submitHandler}>
        <h3>Forgot Password</h3>
        <div className="form-group">
          <label>Email</label>
          <input type = "text" name = "mail" value={mail}  className="form-control"  
                  onChange={this.changeHandler}/>
        </div>
        <button className="btn btn-primary btn-block">Send Mail</button>       
      </form>
      </Container>
     </React.Fragment>
    
        
    );
  }
}

export default Forgot;


