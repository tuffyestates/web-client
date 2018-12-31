import React from 'react';
import PropTypes from 'prop-types';

import {Form} from './';

export class Input extends React.PureComponent {
    render() {
        const {editableLineColor, inputStyle, className, ...passthrough} = this.props;

        return (<Form.Input {...passthrough} inputStyle={Object.assign({
                backgroundColor: 'transparent'
            }, inputStyle)} className={className} css={{
                border: 'none',
                borderBottom: `1px solid ${passthrough.editable && !passthrough.value
                    ? editableLineColor
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
        const {className,textareaStyle, ...passthrough} = this.props;
        return (<div css={{
                display: 'inline-flex',
                alignItems: 'center'
            }} className={className}>

            <Form.Textarea {...passthrough} textareaStyle={Object.assign({
                    backgroundColor: 'transparent',
                }, textareaStyle)} css={{
                    flex: 1,
                    border: 'none',
                    borderBottom: `1px solid ${passthrough.editable && !passthrough.value
                        ? '#ffffff'
                        : 'transparent'}`
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
