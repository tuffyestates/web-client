import React from 'react';
import Colors from '../colors';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';

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
                    marginTop: -4,
                    borderBottom: `5px solid ${Colors.blue}`
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
