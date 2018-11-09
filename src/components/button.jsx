import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';

import Colors from '../colors';

const BUTTON_SHARED_STYLE = {
    border: '1px solid transparent',
    appearance: 'none',
    backgroundColor: Colors.orange,
    color: 'white',
    fontSize: '1.2em',
    fontFamily: 'cabin',
    transition: 'all 0.2s',
    cursor: 'pointer',
    ':disabled': {
        backgroundColor: 'lightgrey',
        cursor: 'auto'
    }
};

export default class Button extends React.PureComponent {
    render() {
        return (<button css={{
                padding: '0.4em 1.5em',
                transition: 'all 0.2s',
                ':hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 4px 0 0 ${Colors.blue}`,
                },
                ...BUTTON_SHARED_STYLE
            }} {...this.props}>
            {this.props.children}
        </button>);
    }
    static propTypes = {};
    static defaultProps = {};
    static docProps = {
        children: "Hello!"
    };
}

export class Primary extends React.PureComponent {
    render() {
        return (<button css={{
                padding: '0.8em 1.5em',
                transition: 'all 0.7s',
                ':hover': {
                    backgroundColor: Colors.darkOrange
                },
                ...BUTTON_SHARED_STYLE
            }} {...this.props}>
            {this.props.children}
        </button>);
    }
    static propTypes = {};
    static defaultProps = {};
    static docProps = {
        children: "Hello!"
    };
}
