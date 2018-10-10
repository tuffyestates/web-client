import React from 'react';

export default class Login extends React.PureComponent {
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
        return (<div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <h1>Login</h1>
            <form onSubmit={this.login}>
                <input placeholder="Username" name="username"/>
                <input placeholder="Password" type="password" name="password"/>
                <button type="submit">Submit</button>
                <div>
                    {this.state.error}
                    {this.state.message}
                </div>
            </form>
        </div>);
    }
}
