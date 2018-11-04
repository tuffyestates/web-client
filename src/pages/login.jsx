import React from 'react';
import {Form, Button} from '../components';
import Colors from '../colors';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Subscribe} from 'react-contextual';
/** @jsx jsx */
import {jsx} from '@emotion/core';

import {Account} from '../contexts';

class Login extends React.PureComponent {
    state = {};
    login = async (e) => {
        e.preventDefault();
        // Reset message and error to empty
        this.setState({error: "", message: ""});

        // Convert form to FormData
        const formdata = new FormData(e.currentTarget);

        try {
            // Call login action on global account state
            await this.props.account.login(formdata);

            // If we got this far then the login was a success, lets inform the user
            this.setState({message: "Login success"});
        } catch (error) {
            // The account.login action failed for some reason, lets inform the user
            this.setState({error: error.toString()});
        }
    };
    render() {
        return (<div css={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

            <div css={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: Colors.blue,
                    marginTop: '5em',
                    borderRadius: '5px',
                    padding: '4em'
                }}>
                <h1 css={{
                        color: 'white',
                        fontFamily: 'cabin',
                        fontWeight: '100',
                        marginTop: 0
                    }}>Login</h1>
                <form css={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }} onSubmit={this.login}>
                    <Form.Input prefix={(<FontAwesomeIcon icon="user"/>)} placeholder="Username" name="username" message={this.state.error}/>
                    <Form.Input prefix={(<FontAwesomeIcon icon="lock"/>)} placeholder="Password" type="password" name="password" message={this.state.message}/>
                    <Button>Login</Button>
                </form>
            </div>
        </div>);
    }
}

export default class Wrapper extends React.PureComponent {
    render() {
        return (<Subscribe to={Account}>
            {account => <Login account={account}/>}
        </Subscribe>);
    }
}
