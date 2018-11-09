import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';
import autosize from 'autosize';

export class Input extends React.PureComponent {
    render() {
        let message = null,
            prefix = null,
            suffix = null;
        if (this.props.message) {
            message = (<div css={{
                    border: '1px solid lightgrey',
                    backgroundColor: '#efefef',
                    padding: '0.3em 1.2em',
                    fontSize: '0.9em',
                    ...this.props.messageStyle
                }}>{this.props.message}</div>);
        }
        if (this.props.prefix) {
            prefix = (<span css={{
                    backgroundColor: '#F2F2F2',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 1em',
                    color: '#888',
                    borderRight: '1px solid #C1C1C1'
                }}>
                {this.props.prefix}
            </span>);
        }
        if (this.props.suffix) {
            suffix = (<span css={{
                    backgroundColor: '#F2F2F2',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 1em',
                    color: '#888',
                    borderLeft: '1px solid #C1C1C1'
                }}>
                {this.props.suffix}
            </span>);
        }

        const passthroughProps = {
            autoFocus: this.props.autoFocus,
            name: this.props.name,
            value: this.props.value,
            defaultValue: this.props.defaultValue,
            placeholder: this.props.placeholder,
            disabled: this.props.disabled,
            type: this.props.type,
            readOnly: this.props.readOnly,
            onChange: this.props.onChange,
            min: this.props.min,
            max: this.props.max
        };

        return (<div css={[
                {
                    minWidth: 0,
                    border: '1px solid #C1C1C1',
                    borderBottom: message
                        ? 'none'
                        : '1px solid #C1C1C1'
                },
                this.props.className
            ]}>
            <div css={{
                    display: 'flex'
                }}>
                {prefix}
                <input {...passthroughProps} css={Object.assign({
                        flex: 1,
                        padding: '0.5em 0.8em',
                        border: 'none',
                        minWidth: 0,
                        '::placeholder': {
                            color: '#A8A8A8'
                        }
                    }, this.props.inputStyle)}/> {suffix}
            </div>
            {message}
            {this.props.children}
        </div>);
    }
    static messageStyle = {
        error: {
            borderColor: '#CB3837',
            backgroundColor: '#FEF2F2',
            color: '#CB3837'
        }
    };
    static propTypes = {
        /**
         * Styles to be applied to the inner input dom node
         */
        inputStyle: PropTypes.object,
        /**
         * A message displayed below the input
         */
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        /**
         * Information displayed before the input
         */
        prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        /**
         * Information displayed after the input
         */
        suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    };
    static defaultProps = {};
    static docProps = {
        message: "You've been selected to become a unicorn!",
        prefix: "Mr.",
        suffix: "Jr."
    };
}
export class Textarea extends React.PureComponent {
    textarea = React.createRef();
    componentDidMount() {
        autosize(this.textarea.current);
    }
    componentDidUpdate() {
        autosize.update(this.textarea.current);
    }
    componentWillUnmount() {
        autosize.destroy(this.textarea.current);
    }
    render() {
        let message = null;
        if (this.props.message) {
            message = (<div css={{
                    border: '1px solid lightgrey',
                    backgroundColor: '#efefef',
                    padding: '0.3em 1.2em',
                    fontSize: '0.9em',
                    ...this.props.messageStyle
                }}>{this.props.message}</div>);
        }

        const passthroughProps = {
            autoFocus: this.props.autoFocus,
            name: this.props.name,
            value: this.props.value,
            defaultValue: this.props.defaultValue,
            placeholder: this.props.placeholder,
            disabled: this.props.disabled,
            readOnly: this.props.readOnly,
            onChange: this.props.onChange
        };

        return (<div css={[
                {
                    minWidth: 0,
                    border: '1px solid #C1C1C1',
                    borderBottom: message
                        ? 'none'
                        : '1px solid #C1C1C1'
                },
                this.props.className
            ]}>
            <textarea ref={this.textarea} {...passthroughProps} css={Object.assign({
                    display: 'block',
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '0.5em 0.8em',
                    border: 'none',
                    resize: 'none',
                    '::placeholder': {
                        color: '#A8A8A8'
                    }
                }, this.props.textareaStyle)}/> {message}
            {this.props.children}
        </div>);
    }
    static messageStyle = {
        error: {
            borderColor: '#CB3837',
            backgroundColor: '#FEF2F2',
            color: '#CB3837'
        }
    };
    static propTypes = {
        /**
         * Styles to be applied to the inner textarea dom node
         */
        textareaStyle: PropTypes.object,
        /**
         * A message displayed below the input
         */
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    };
    static defaultProps = {};
    static docProps = {
        placeholder: "Ello gov'na!",
        message: "You've been selected to become a unicorn!",
    };
}