import React from 'react';
import Colors from '../colors';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';

import {Form} from './';

const numberFormatter = new Intl.NumberFormat('en-US');

export default class Range extends React.PureComponent {
    render() {
        const {className, children, name, ...passthrough} = this.props;
        return (<div css={{
                display: 'flex',
                alignItems: 'center',
                'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button' : {
                    '-webkitAppearance': 'none',
                    margin: 0
                },
                'input[type="number"]' : {
                    '-mozAppearance': 'textfield'
                }
            }} className={className}>

            <Form.Input css={{flex: 1}} type="number" pattern="\d" inputMode="numeric" {...passthrough} name={`${name}-lower`} placeholder={numberFormatter.format(this.props.min)} /> {children}

            <Form.Input css={{flex: 1}} type="number" pattern="\d" inputMode="numeric" {...passthrough} name={`${name}-upper`} placeholder={numberFormatter.format(this.props.max)} />

        </div>);
    }
    static propTypes = {
        /**
         * Suffix for each input
         */
        suffix: PropTypes.string,
        /**
         * Prefix for each input
         */
        prefix: PropTypes.string,
        /**
          * Placed between the two ranges
          */
        children: PropTypes.element.isRequired
    };
    static defaultProps = {
        children: (<div css={{
                height: 1,
                width: '2em',
                backgroundColor: '#efefef',
                margin: '0 1em'
            }}></div>)
    };
    static docProps = {
        min: 10512,
        max: 539294213,
        prefix: 'Secure',
        suffix: 'Score'
    };
}
