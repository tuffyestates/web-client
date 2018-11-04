import React from 'react';
import {Form, Button} from '../components';
import Colors from '../colors';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Subscribe} from 'react-contextual';

import {Account} from '../contexts';

class Register extends React.PureComponent {
    state = {};
    register = async (e) => {
        e.preventDefault();
        // Reset message and error to empty
        this.setState({error: "", message: ""});

        // Convert form to FormData
        const formdata = new FormData(e.currentTarget);

        try {
            // Call login action on global account state
            await this.props.account.register(formdata);

            // If we got this far then the login was a success, lets inform the user
            this.setState({message: "Register success"});
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
                alignItems: 'center',
                marginBottom: '1em',
                height: 'calc(100% - 1em)',
                overflow: 'hidden',
                backgroundImage: `url(${require('../assets/images/shifaaz-shamoon-1113391-unsplash.jpg?size=2000')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
                backgroundColor: '#0000004d',
            }}>

            <div css={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    boxShadow: '0px 5px 10px 1px rgba(0, 0, 0, 0.1)',
                    borderRadius: '5px',
                    padding: '4em',
                    opacity: '.9',
                }}>
                <h1 css={{
                        fontFamily: 'cabin',
                        fontWeight: '100',
                        marginTop: 0,
                        width: '100%',
                        borderBottom: '1px solid lightgrey',
                        textAlign: 'center'
                    }}>Register</h1>
                <form css={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }} onSubmit={this.register}>
                    <Form.Input css={{marginBottom: '1em'}} prefix={(<FontAwesomeIcon icon="user"/>)} placeholder="Username" name="username" message={this.state.error}/>
                    <Form.Input css={{marginBottom: '2em'}} prefix={(<FontAwesomeIcon icon="lock"/>)} placeholder="Password" type="password" name="password" message={this.state.message}/>
                    <Button>Register</Button>
                </form>
            </div>
        </div>);
    }
}

export default class Wrapper extends React.PureComponent {
    render() {
        return (<Subscribe to={Account}>
            {account => <Register account={account}/>}
        </Subscribe>);
    }
}
