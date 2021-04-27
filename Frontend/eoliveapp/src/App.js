import React,  { Component }  from 'react';
import Home from './ReactPages/Home';
import Login from './ReactPages/Login';
import Signup from './ReactPages/Signup';
import NavigationBar from './ReactPages/NavigationBar';
import OPG from './ReactPages/OPGinfo';
import TableBerba from './ReactPages/Tableberba';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from './ReactPages/Token/actions/auth';
import './ReactPages/static/style.css';
import 'bootstrap';



class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }
    render(){
        return (
        <Router>
          < div className="Lbackground">
            <NavigationBar {...this.props}>
              <Switch> 
                <Route path="/" exact component={Login}/>
                <Route path="/Home" exact component={Home}/>
                <Route path="/Signup" exact component={Signup}/>
                <Route path="/Berba" exact component={TableBerba}/>
                <Route path="/Opg" exact component={OPG}/>
              </Switch>
            </NavigationBar>
          </div>
        </Router>
        );
    }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);