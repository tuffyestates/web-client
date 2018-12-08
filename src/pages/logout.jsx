import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Subscribe } from 'react-contextual';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import cookies from 'cookies';

import { Account } from '../contexts';

class Logout extends React.PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    state = {
        message: "Logging out..."
    };
    logout = async () => {
        // Reset message and error to empty
        this.setState({ error: undefined, message: undefined });

        try {
            // Call login action on global account state
            await this.props.account.logout();

            cookies.set('has-token', 0, {maxAge: 0, overwrite: true});

            // If we got this far then the login was a success, lets inform the user
            this.setState({
                message: "Logout success! Redirecting to home page..."
            }, () => {
                // let's redirect the user to the listings page
                setTimeout(() => {
                    this.props.history.push('/')
                }, 2000)
            });
        } catch (error) {
            // The account.login action failed for some reason, lets inform the user
            this.setState({ error: error.toString() });
        }
    };
    componentDidMount() {
        this.logout();
    }
    render() {
        return (
            <h3 style={{textAlign: 'center'}}>{this.state.error ? this.state.error : this.state.message}</h3>
        );
    }
}

const LogoutWithRouter = withRouter(Logout);

export default class Wrapper extends React.PureComponent {
    render() {
        return (<Subscribe to={Account}>
            {
                account => {
                    return <LogoutWithRouter account={account}/>
                }
            }
        </Subscribe>);
    }
}
