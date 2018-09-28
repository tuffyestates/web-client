import React from 'react';
import {Subscribe} from 'react-contextual';
import {Account} from '../contexts';

export default class Login extends React.PureComponent {
    state = {};
    render() {
        return (<div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <h1>Login</h1>
            {/* The Subscribe componenet provides access to the global account store*/}
            <Subscribe to={Account}>
                {
                    account => <form onSubmit={async (e) => {
                                e.preventDefault();
                                // Reset message and error to empty
                                this.setState({error: "", message: ""});

                                // Convert form to FormData
                                const formdata = new FormData(e.currentTarget);

                                try {
                                    // Call login action on global account state
                                    await account.login(formdata);

                                    // If we got this far then the login was a success, lets inform the user
                                    this.setState({message: "Login success"});
                                } catch (error) {
                                    // The account.login action failed for some reason, lets inform the user
                                    this.setState({error: error.toString()});
                                }
                            }}>
                            <input placeholder="Username" name="username"/>
                            <input placeholder="Password" type="password" name="password"/>
                            <button type="submit">Submit</button>
                            <div>
                                {this.state.error}
                                {this.state.message}
                            </div>
                        </form>
                }
            </Subscribe>
        </div>);
    }
}
