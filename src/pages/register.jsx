import React from 'react';
import { Form } from '../components';
import { Primary } from '../components/button';
import Colors from '../colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Subscribe } from 'react-contextual';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Account } from '../contexts';

class Register extends React.PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    state = {};
    register = async (e) => {
        e.preventDefault();
        // Reset message and error to empty
        this.setState({ error: "", message: "" });

        // Convert form to FormData
        const formdata = new FormData(e.currentTarget);

        try {
            // Call login action on global account state
            await this.props.account.register(formdata);

            // If we got this far then the login was a success, lets inform the user
            this.setState({ message: "Register success! Redirecting to properies page..." }, () => {
                // let's redirect the user to the listings page
                setTimeout(() => {
                    this.props.history.push('/properties')
                }, 2000)
            });
        } catch (error) {
            // The account.login action failed for some reason, lets inform the user
            this.setState({ error: error.toString() });
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

            <form onSubmit={this.register} css={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'white',
                boxShadow: '0px 5px 10px 1px rgba(0, 0, 0, 0.1)',
                borderRadius: '5px',
            }}>
                <h1 css={{
                    fontFamily: 'cabin',
                    fontWeight: '100',
                    marginTop: 0,
                    width: '100%',
                    backgroundColor: '#333',
                    color: 'white',
                    padding: '0.4em',
                    boxShadow: '0px 5px 10px 1px rgba(0, 0, 0, 0.1)',
                    boxSizing: 'border-box',
                    textAlign: 'center',
                }}>Register</h1>
                <div css={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '1em 4em',
                    alignItems: 'center'
                }}>
                    <Form.Input css={{ marginBottom: '1em' }} prefix={(<FontAwesomeIcon icon={faUser} />)} placeholder="Username" name="username" message={this.state.error} />
                    <Form.Input css={{ marginBottom: '2em' }} prefix={(<FontAwesomeIcon icon={faLock} />)} placeholder="Password" type="password" name="password" message={this.state.message} />
                </div>
                <Primary css={{ width: '100%' }}>Register</Primary>
            </form>
        </div>);
    }
}

const RegisterWithRouter = withRouter(Register);

export default class Wrapper extends React.PureComponent {
    render() {
        return (<Subscribe to={Account}>
            {account => {
                return <RegisterWithRouter account={account} />
            }}
        </Subscribe>);
    }
}
