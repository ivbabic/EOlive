import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import * as actions from './Token/actions/auth';
import './static/style.css';

export class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: '',
        }
    }

    handleClick(event) {
        this.props.onAuth(this.state.username, this.state.email, this.state.password1, this.state.password2);
    }

    render() {
        let errorM = null;
        if (this.props.error) {
            errorM = (
                <p>{this.props.error.message}</p>
            );
        }
        return (
            <div>
                {errorM}
                <Form>
                    <FormGroup className="Formfield">
                        <Label className="Labelfield" for="username"></Label>
                        <Input type="text" name="username" className="FormLogin" id="username" placeholder="Unesite korisničko ime" onChange={(event) => this.setState({ username: event.target.value })} />
                    </FormGroup>
                    <FormGroup className="Formfield">
                        <Label for="email"></Label>
                        <Input type="text" name="email" id="email" placeholder="Unesite E-mail" onChange={(event) => this.setState({ email: event.target.value })} />
                    </FormGroup>
                    <FormGroup className="Formfield">
                        <Label for="Lozinka"></Label>
                        <Input type="password" name="password1" id="password1" placeholder="Lozinka" onChange={(event) => this.setState({ password1: event.target.value })} />
                    </FormGroup>
                    <FormGroup className="Formfield">
                        <Label for="Lozinka"></Label>
                        <Input type="password" name="password2" id="password2" placeholder="Potvrdite Lozinku" onChange={(event) => this.setState({ password2: event.target.value })} />
                    </FormGroup>
                    <FormGroup className="Formfield">
                        <Button type="submit" variant="success" className="button_p" onClick={(event) => this.handleClick(event)}>Stvori račun</Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
