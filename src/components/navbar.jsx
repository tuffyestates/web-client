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
                    // color: 'blue',

                    // backgroundColor: '#fafafa',
                    backgroundColor: Colors.blue,
                    // color: Colors.orange,
                    color: '#fafafa',

                    // borderRadius: '25px',

                    clipPath: 'polygon(25% 0, 100% 0%, 75% 100%, 0 100%)',

                    // webkitBorderRadius: '200px',
                    // webkitBorderTopRightRadius: '0px',
                    // webkitBorderBottomLeftRadius: '25px',
                    // mozBorderRadius: '200px',
                    // mozBorderRadiusTopRight: '0px',
                    // mozBorderRadiusBottomLeft: '25px',
                    // borderRadius: '200px',
                    // borderTopRightRadius: '0px',
                    // borderBottomLeftRadius: '0px',

                    opacity: '0.8'
                }

            }} activeStyle={{

                // backgroundColor: '#fafafa',
                backgroundColor: Colors.orange,
                // color: Colors.orange,
                color: '#fafafa',

                // borderRadius: '25px',

                clipPath: 'polygon(25% 0, 100% 0%, 75% 100%, 0 100%)',

                // webkitBorderRadius: '200px',
                // webkitBorderTopRightRadius: '20px',
                // webkitBorderBottomLeftRadius: '25px',
                // mozBorderRadius: '200px',
                // mozBorderRadiusTopRight: '20px',
                // mozBorderRadiusBottomLeft: '25px',
                // borderRadius: '200px',
                // borderTopRightRadius: '20px',
                // borderBottomLeftRadius: '25px',

                opacity: '0.8'
            }} {...this.props}>
            {this.props.children}
        </RouterLink>);
    }
}

export default class Navbar extends React.Component {
    render() {
        return (<div css={{

                fontFamily: 'cabin',

                margin: '12px 10px 0 10px',
                display: 'flex',
                // backgroundColor: Colors.orange,
                // backgroundColor: '#fafafa',
                justifyContent: 'space-between'
                // position: 'sticky',
                // top: 0
            }}>
            <RouterLink exact={true} to="/" css={{
                    padding: '1em 2em',
                    display: 'inline-block',
                    fontWeight: '300',
                    color: 'white',
                    // color: Colors.orange,
                    textDecoration: 'none',
                    transition: 'all .4s ease-in-out',

                    backgroundColor: Colors.blue,
                    // borderRadius: '25px',
                    opacity: '0.8',

                    clipPath: 'polygon(25% 0, 100% 0%, 75% 100%, 0 100%)',

                    // webkitBorderRadius: '25px',
                    // webkitBorderTopRightRadius: '200px',
                    // webkitBorderBottomLeftRadius: '200px',
                    // mozBorderRadius: '25px',
                    // mozBorderRadiusTopRight: '200px',
                    // mozBorderRadiusBottomLeft: '200px',
                    // borderRadius: '25px',
                    // borderTopRightRadius: '200px',
                    // borderBottomLeftRadius: '200px',

                    '&:hover' : {
                        backgroundColor: Colors.orange,

                        transform: 'translateX(20px)'
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
                <Link to="/listings">
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
