import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';

import Colors from '../colors';

export default class Button extends React.PureComponent {
    render() {
        return (<button css={{
                border: '1px solid transparent',
                appearance: 'none',
                padding: '0.4em 1.5em',
                backgroundColor: Colors.orange,
                color: 'white',
                fontSize: '1.2em',
                fontFamily: 'cabin',
                transition: 'all 0.2s',
                cursor: 'pointer',
                ':hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 4px 0 0 ${Colors.blue}`,
                }
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
                border: '1px solid transparent',
                appearance: 'none',
                padding: '0.8em 1.5em',
                backgroundColor: Colors.orange,
                color: 'white',
                fontSize: '1.2em',
                fontFamily: 'cabin',
                transition: 'all 0.7s',
                cursor: 'pointer',
                ':hover': {
                    backgroundColor: Colors.darkOrange
                }
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
