import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Token/actions/auth';

export class Navigation extends Component {
    render() {
        return (
            <div >
                <Navbar collapseOnSelect expand="lg" bg="light" variant="light"  className="NavBar">
                    <Navbar.Brand href="#home" className="NavBarBrand">E-olive</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        {
                            this.props.isAuthenticated ?
                            <Nav.Link href="#Login" onClick={this.props.logout}>Odjava</Nav.Link>
                            :
                            <Nav.Link href="./Login">Prijava</Nav.Link>
                        }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Navigation)); 

