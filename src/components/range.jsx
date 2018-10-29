import React from 'react';
import Colors from '../colors';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';

import {Input} from './';

export default class Range extends React.PureComponent {
    render() {
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
            }} className={this.props.className}>

            <Input type="number" pattern="\d" inputMode="numeric" styep={this.props.step} min={this.props.min} max={this.props.max} placeholder={this.props.min} suffix={this.props.suffix} prefix={this.props.prefix}/> {this.props.children}

            <Input type="number" pattern="\d" inputMode="numeric" styep={this.props.step} min={this.props.min} max={this.props.max} placeholder={this.props.max} suffix={this.props.suffix} prefix={this.props.prefix}/>

        </div>);
    }
    static propTypes = {
        /**
         * An array containing placeholders, first element goes to the min input and the second to the max input
         */
        placeholders: PropTypes.array,
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
        placeholders: [
            '10,512', '539,294,213'
        ],
        prefix: 'Secure',
        suffix: 'Score'
    };
}
