import React from 'react';
import Colors from '../colors';

export default class Input extends React.PureComponent {
    render() {
        let message = null,
            prefix = null,
            suffix = null;
        if (this.props.message) {
            message = (<div style={{
                    border: '1px solid #CB3837',
                    backgroundColor: '#FEF2F2',
                    padding: '0.3em 1.2em',
                    fontSize: '0.9em',
                    color: '#CB3837',
                    ...this.props.messageStyle
                }}>{this.props.message}</div>);
        }
        if (this.props.prefix) {
            prefix = <span style={{
                    color: 'white',
                    backgroundColor: '#F2F2F2',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 1em'
                }}>
                {this.props.prefix}
            </span>;
        }
        if (this.props.suffix) {
            suffix = <span style={{
                    color: 'white',
                    backgroundColor: '#F2F2F2',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0 1em'
                }}>
                {this.props.suffix}
            </span>;
        }
        return (<div style={{
                marginBottom: '1em',
                ...this.props.style
            }}>
            <div style={{
                    display: 'flex',
                    border: '1px solid #C1C1C1',
                    borderBottom: message ? 'none' : '1px solid #C1C1C1'
                }}>
                {prefix}
                <input name={this.props.name} type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange} style={{
                        flex: 1,
                        padding: '0.5em 0.8em',
                        color: '#A8A8A8',
                        border: 'none',
                        ...this.props.inputStyle
                    }}/>
                {suffix}
            </div>
            {message}
            {this.props.children}
        </div>);
    }
}
