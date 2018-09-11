import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

class Link extends React.Component {
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

export default class Navbar extends React.Component {
    render() {
        return (<div style={{
                display: 'flex',
                backgroundColor: 'orange',
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
            </div>
        </div>);
    }
}
