import React from 'react';
import {NavLink as RouterLink} from 'react-router-dom';
import {Subscribe} from 'react-contextual';
import Colors from '../colors';
import {Account} from '../contexts';
/** @jsx jsx */
import {jsx} from '@emotion/core';

class Link extends React.Component {
    render() {
        return (<RouterLink css={{
                fontFamily: 'cabin',
                padding: '1em 2em',
                display: 'inline-block',
                textDecoration: 'none',
                color: Colors.orange,
                clipPath: 'polygon(25% 0, 100% 0%, 75% 100%, 0 100%)',
                transition: 'backgroundColor .4s ease-in-out',

                '&:hover' : {
                    backgroundColor: Colors.blue,
                    color: '#fafafa',
                    clipPath: 'polygon(25% 0, 100% 0%, 75% 100%, 0 100%)',
                }

            }} activeStyle={{
                backgroundColor: Colors.orange,
                color: '#fafafa',
                clipPath: 'polygon(25% 0, 100% 0%, 75% 100%, 0 100%)',
            }} {...this.props}>
            {this.props.children}
        </RouterLink>);
    }
}

export default class Navbar extends React.Component {
    render() {
        return (<div css={{

                fontFamily: 'cabin',
                borderTop: '1px solid #d3d3d34d',
                borderBottom: '1px solid #d3d3d34d',
                margin: '0.5em 0',
                padding: '0 1em',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
            <RouterLink exact={true} to="/" css={{
                    padding: '1em 2em',
                    display: 'inline-block',
                    fontWeight: '300',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'all .4s ease-in-out',
                    backgroundColor: Colors.orange,
                    clipPath: 'polygon(25% 0, 100% 0%, 75% 100%, 0 100%)',

                    '&:hover' : {
                        backgroundColor: Colors.blue,

                        transform: 'translateX(1em)'
                    }

                }}>
                Tuffy Estates
            </RouterLink>
            <div css={{
                    textDecoration: 'none'
                }}>
                <Link exact={true} to="/">
                    Home
                </Link>
                <Link to="/properties">
                    Listings
                </Link>
                <Link to="/register">
                    Register
                </Link>
                <Link to="/login">
                    Login
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
