import React from 'react';
import {Input} from '../components';
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
        return (
        <div
          css={{
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',

            }}>



          <div css={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: Colors.blue,
                opacity: '0.9',
                width: '350px',
                height: '250px',
                margin: '100px 0',
                borderRadius: '5px',
                position: 'relative',
                padding: '30px',
            }}>
            <h1

              css={{
                color: 'white',
                fontFamily: 'cabin',
                fontWeight: '100',
            }}

              >Register</h1>
            <form

              css={{
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',

            }}


               onSubmit={this.register}>
                <Input prefix={(<FontAwesomeIcon icon="user"/>)} placeholder="Username" name="username" message={'hello'}/>
                <Input prefix={(<FontAwesomeIcon icon="lock"/>)} placeholder="Password" type="password" name="password"/>
                <button

                  css={{
                    backgroundColor: Colors.orange,
                    color: 'white',
                    fontFamily: 'cabin',
                    fontSize: '20px',
                    fontWeight: '100',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    padding: '5px 30px',
                    borderRadius: '5px',
                    letterSpacing: '3px',
                    margin: '15px',
                  }}


                   type="submit">Submit</button>
                <div>
                    {this.state.error}
                    {this.state.message}
                </div>
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
