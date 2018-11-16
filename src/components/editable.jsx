import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';

import {Form} from './';
import Colors from '../colors';

// const editIcon = (<FontAwesomeIcon css={{
//         fontSize: '0.5em',
//         marginRight: '0.5em',
//         display: this.props.editable
//             ? 'block'
//             : 'none'
//     }} icon={['far', 'edit']}/>);

export class Input extends React.PureComponent {
    render() {
        const passThroughProps = {
            autoFocus: this.props.autoFocus,
            name: this.props.name,
            value: this.props.value,
            defaultValue: this.props.defaultValue,
            placeholder: this.props.placeholder,
            disabled: this.props.disabled || !this.props.editable,
            type: this.props.type,
            readOnly: this.props.readOnly || !this.props.editable,
            onChange: this.props.onChange,
            required: this.props.required,
            className: this.props.className,
            prefix: this.props.prefix,
            suffix: this.props.suffix,
            message: this.props.message,
            suffixStyle: this.props.suffixStyle
        }
        return (<Form.Input {...passThroughProps} inputStyle={Object.assign({
                backgroundColor: 'transparent'
            }, this.props.inputStyle)} css={{
                border: 'none',
                borderBottom: `1px solid ${this.props.editable && !this.props.value
                    ? this.props.editableLineColor
                    : 'transparent'}`
            }}/>);
    }
    static propTypes = {
        /**
         * Defines whether the field can be modified
         */
        editable: PropTypes.bool,
        /**
         * Defines whether the field can be modified
         */
        editableLineColor: PropTypes.string
    };
    static defaultProps = {
        editable: false,
        editableLineColor: '#ffffff'
    };
    static docProps = {
        placeholder: 'Edit Me!',
        editable: true,
        editableLineColor: '#333'
    };
}

export class Textarea extends React.PureComponent {
    render() {
        const passThroughProps = {
            autoFocus: this.props.autoFocus,
            name: this.props.name,
            value: this.props.value,
            defaultValue: this.props.defaultValue,
            placeholder: this.props.placeholder,
            required: this.props.required,
            disabled: this.props.disabled || !this.props.editable,
            type: this.props.type,
            readOnly: this.props.readOnly || !this.props.editable,
            onChange: this.props.onChange
        }
        return (<div css={{
                display: 'inline-flex',
                alignItems: 'center'
            }} className={this.props.className}>

            <Form.Textarea {...passThroughProps} textareaStyle={Object.assign({
                    backgroundColor: 'transparent',
                }, this.props.textareaStyle)} css={{
                    flex: 1,
                    border: 'none',
                    borderBottom: `1px solid ${this.props.editable && !this.props.value
                        ? '#ffffff'
                        : 'transparent'}`,

                }}/>

        </div>);
    }
    static propTypes = {
        /**
         * Defines whether the field can be modified
         */
        editable: PropTypes.bool
    };
    static defaultProps = {
        editable: false
    };
    static docProps = {
        placeholder: 'Edit Me!',
        editable: true
    };
}
