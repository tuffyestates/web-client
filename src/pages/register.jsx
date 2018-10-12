import React from 'react';
import {Input} from '../components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class Register extends React.PureComponent {
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
        return (<div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <h1>Register</h1>
            <form onSubmit={this.register}>
                <Input prefix={(<FontAwesomeIcon icon="user"/>)} placeholder="Username" name="username" message={'hello'}/>
                <Input prefix={(<FontAwesomeIcon icon="lock"/>)} placeholder="Password" type="password" name="password"/>
                <button type="submit">Submit</button>
                <div>
                    {this.state.error}
                    {this.state.message}
                </div>
            </form>
        </div>);
    }
}
