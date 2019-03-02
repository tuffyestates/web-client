import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import {Subscribe} from '@fallingsnow/react-contextual';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import cookies from 'js-cookie';

import {Account} from '../contexts';
import {Form} from '../components';
import {Primary} from '../components/button';
import {get} from '../utils';

class Login extends React.PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

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

            cookies.set('has-token', 1, {expires: 7});

            // If we got this far then the login was a success, lets inform the user
            this.setState({
                message: "Login success! Redirecting you..."
            }, () => {
                // let's redirect the user to the listings page
                setTimeout(() => {
                    this.props.history.push(get(this.props, 'location.state.from.pathname') || '/properties')
                }, 2000)
            });
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
                backgroundImage: `url(${require('../assets/images/alex-jodoin-246078-unsplash.jpg?size=2000')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 70%',
                backgroundBlendMode: 'overlay',
                backgroundColor: '#0000002a'
            }}>

            <form onSubmit={this.login} css={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    boxShadow: '0px 5px 10px 1px rgba(0, 0, 0, 0.1)',
                    borderRadius: '5px'
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
                        textAlign: 'center'
                    }}>Login</h1>
                <div css={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: '1em 4em',
                        alignItems: 'center'
                    }}>
                    <Form.Input css={{
                            marginBottom: '1em'
                        }} prefix={(<FontAwesomeIcon icon={faUser}/>)} placeholder="Username" name="username" message={this.state.error} autoFocus={true}/>
                    <Form.Input css={{
                            marginBottom: '2em'
                        }} prefix={(<FontAwesomeIcon icon={faLock}/>)} placeholder="Password" type="password" name="password" message={this.state.message}/>
                    {get(this.props, 'location.state.from') ? (<small style={{color: '#f44336', marginBottom: '1em'}}>You must login to access {this.props.location.state.from.pathname}</small>) : null}
                </div>
                <Primary css={{
                        width: '100%'
                    }}>Login</Primary>
            </form>
        </div>);
    }
}

const LoginWithRouter = withRouter(Login)

export default class Wrapper extends React.PureComponent {
    render() {
        return (<Subscribe to={Account}>
            {
                account => {
                    return <LoginWithRouter account={account}/>
                }
            }
        </Subscribe>);
    }
}
