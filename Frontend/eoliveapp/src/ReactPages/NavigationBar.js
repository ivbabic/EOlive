import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Token/actions/auth';
import 'bootstrap/dist/css/bootstrap.min.css';



class NavigationBar extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav" >
                    <div className="container">
                        <a className="navbar-brand js-scroll-trigger" link to="#page-top" className="NavBarBrand">E-olive</a>
                        <a className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                        </a>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav text-uppercase ml-auto" >
                                <li className="nav-item">
                                    <a className="nav-link js-scroll-trigger" className="navbar" href="/Opg"><b>Gospodarstva</b></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link js-scroll-trigger" className="navbar" href="/Berba"><b>Berba</b></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link js-scroll-trigger" className="navbar" href='/Home'><b>Home</b></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link js-scroll-trigger" className="navbar" href="/Signup"><b>Registracija</b></a>
                                </li>
                                <li className="nav-item">
                                    {
                                        this.props.isAuthenticated ?
                                            <a className="nav-link js-scroll-trigger" className="navbar" onClick={this.props.logout} ><b>Logout</b></a>
                                            :
                                            <a className="nav-link js-scroll-trigger" className="navbar" href="/"><b>Login</b></a>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div >
                    {this.props.children}
                </div>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}


export default withRouter(connect(null, mapDispatchToProps)(NavigationBar)); 
