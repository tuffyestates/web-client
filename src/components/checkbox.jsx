import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

import Colors from '../colors';

export default class Checkbox extends React.PureComponent {
    state = {
        checked: this.props.defaultChecked || this.props.checked
    }
    render() {
        const id = shortid.generate();

        return (<div className={this.props.className} css={{
                'input:checked + label > div > .checkmark' : {
                    visibility: 'visible !important'
                }
            }}>
            <input style={{
                    display: 'none'
                }} type="checkbox" id={id} name={this.props.name} defaultChecked={this.props.defaultChecked}/>

            <label css={{
                    display: 'inline-flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                }} htmlFor={id}>
                <div css={{
                        border: `2px solid ${Colors.blue}`,
                        backgroundColor: 'white',
                        padding: '0.2em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '0.3em'
                    }}><FontAwesomeIcon className="checkmark" icon={faCheck} style={{
                color: Colors.orange,
                visibility: 'hidden'
            }}/></div>{this.props.children}</label>
        </div>);
    }
    static propTypes = {};
    static defaultProps = {};
    static docProps = {
        children: "Hello!"
    };
}
