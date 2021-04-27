import React, { Component } from 'react';
import {  FormGroup, Label, Input } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import * as actions from './Token/actions/auth';
import './static/style.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      username:"",
      email:"",
      password:""
    }
  }
  handleClick(event){
    this.props.onAuth(this.state.username, this.state.email, this.state.password);
  }
  render() {
    let errorM = null;
    if(this.props.error){
      errorM = (
        <p>{this.props.error.message}</p>
    );
    }
    return (

      <div>
        {errorM}
        <Form>
          <FormGroup className="Formfield">
              <Label for="Username"></Label>
              <Input type="text" name="username" className="FormLogin" id="username" placeholder="Unesite username" onChange = {(event) => this.setState({username: event.target.value })} />
          </FormGroup>
          <FormGroup className="Formfield">
              <Label for="Email"></Label>
              <Input type="text" name="email" className="FormLogin" id="email" placeholder="Unesite E-mail" onChange = {(event) => this.setState({email: event.target.value })} />
          </FormGroup>
          <FormGroup className="Formfield">
              <Label for="Lozinka"></Label>
              <Input type="password" name="password"  id="password" placeholder="Lozinka" onChange = {(event) => this.setState({password: event.target.value })} />
          </FormGroup>
          <FormGroup className="Formfield">
              <Button variant="success" className="button_p" onClick={(event) => this.handleClick(event)}>Prijavi me</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (username, email, password) => dispatch(actions.authLogin(username, email, password)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);