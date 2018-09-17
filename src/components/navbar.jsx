import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Subscribe} from 'react-contextual';
import Colors from '../colors';
import {Account} from '../contexts';

class Link extends React.PureComponent {
    render() {
        return (<RouterLink style={{
                padding: '1em 2em',
                display: 'inline-block',
                textDecoration: 'none',
                color: 'white',
            }} {...this.props}>
            {this.props.children}
        </RouterLink>);
    }
}

export default class Navbar extends React.PureComponent {
    render() {
        return (<div style={{
                display: 'flex',
                backgroundColor: Colors.orange,
                justifyContent: 'space-between'
                // position: 'sticky',
                // top: 0
            }}>
            <Link to="/">
                LOGO
            </Link>
            <div>
                <Link to="/">
                    Home
                </Link>
                <Link to="/listings">
                    Listings
                </Link>
                <Link to="/register">
                    Register
                </Link>
                <Link to="/api">
                    API Spec
                </Link>
                <Subscribe to={Account}>
                    {store => <span>{store.username}</span>}
                </Subscribe>
            </div>
        </div>);
    }
}
