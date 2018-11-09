import React from 'react';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
/** @jsx jsx */
import {jsx} from '@emotion/core';

// Load a bunch of code processing libraries
import SyntaxHighlighter, {registerLanguage} from "react-syntax-highlighter/prism-light";
import language from 'react-syntax-highlighter/languages/prism/jsx';
import theme from 'react-syntax-highlighter/styles/prism/vs';
registerLanguage('jsx', language);
import {HashLink} from 'react-router-hash-link';

import Colors from '../../colors';
import {Form} from '../../components';

const Components = require.context('../../components/', true, /\.jsx$/);

class Component extends React.PureComponent {
    state = {
        props: this.props.component.docProps || {}
    }
    render() {
        const details = this.props.details;
        const componentProps = details.props || {};
        const description = details.description
            ? <h4>details.description</h4>
            : null;

        const props = Object.keys(componentProps).map(propName => {
            const prop = componentProps[propName];
            const propType = prop.type.name === 'union'
                ? `[${prop.type.value.map(x => x.name).join(' | ')}]`
                : prop.type.name;
            const placeholder = prop.defaultValue
                ? prop.defaultValue.value
                : '';

            const onChange = e => {
                try {
                    const value = JSON.parse(e.target.value);
                    this.setState({
                        props: {
                            ...this.state.props,
                            [propName]: value
                        }
                    });
                } catch (err) {
                    if (e.target.value === '') {
                        this.setState({
                            props: {
                                ...this.state.props,
                                [propName]: undefined
                            }
                        });
                    }
                }
            };

            return (<React.Fragment key={propName}>
                <Form.Input css={{
                        marginBottom: '1em'
                    }} prefix={propName} suffix={propType} message={prop.description} placeholder={placeholder} defaultValue={JSON.stringify(this.state.props[propName])} onChange={onChange}/>
            </React.Fragment>);
        });

        const example = <this.props.component {...this.state.props}/>;
        return (<div id={this.props.component.name} css={{
                marginBottom: '4em',
                fontSize: '1.1em'
            }}>
            <h3 css={{
                    padding: '0.5em 1em',
                    marginTop: '1em',
                    boxShadow: '0 5px 6px -2px #0000004d'
                }}>{details.displayName}</h3>
            <div css={{
                    paddingLeft: '2em'
                }}>{description}

                <h3>Props:</h3>
                <div css={{
                        borderTop: '1px dashed lightgrey',
                        borderBottom: '1px dashed lightgrey',
                        padding: '1em'
                    }}>{props}</div>

                <h3>Example:</h3>
                <SyntaxHighlighter language='javascript' style={theme} css={{
                        marginBottom: '0 !important',
                        border: '1px solid lightgrey',
                        borderBottom: 'none',
                        overflow: 'auto'
                    }}>{`<${details.displayName}${propsToString(this.state.props)}/>`}</SyntaxHighlighter>
                <div css={{
                        backgroundColor: '#efefef',
                        border: '1px solid lightgrey',
                        padding: '1em',
                        position: 'relative'
                    }}>{example}</div>
            </div>
        </div>);
    }
}

class ComponentFile extends React.PureComponent {
    render() {
        const components = this.props.spec.map(s => {
            const component = this.props.components[s.displayName] || this.props.components.default;
            return (<Component key={s.displayName} component={component} details={s}/>);
        });
        return (<React.Fragment>
            <h2 id={this.props.fileName} css={{
                    backgroundImage: `linear-gradient(to right, ${Colors.darkBlue}, ${Colors.blue})`,
                    color: 'white',
                    padding: '0.5em 1em',
                    marginTop: '2em',
                    boxShadow: '0 5px 6px -2px #0000004d'
                }}>{this.props.fileName}</h2>
            {components}
        </React.Fragment>);
    }
}

class Navbar extends React.PureComponent {
    goTo(id) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView(true);
        }
    }
    render() {
        const links = this.props.links.map(linkName => (<HashLink css={{
                display: 'block',
                textDecoration: 'none',
                padding: '1em',
                cursor: 'pointer',
                color: '#333',
                overflow: 'auto',
                ':hover, :active, :target' : {
                    backgroundColor: Colors.blue,
                    color: 'white'
                }
            }} key={linkName} to={`#${linkName}`}>{linkName}</HashLink>));
        return (<div css={{
                position: 'sticky',
                top: 0
            }} className={this.props.className}>{links}</div>);
    }
}

export default class Docs extends React.PureComponent {
    state = {
        files: require('./gen-docs')
    };
    render() {
        const docs = this.state.files.map(f => (<ComponentFile key={f.relativePath} fileName={f.relativePath} spec={f.spec} components={Components(f.relativePath)}/>));
        return (<div css={{
                fontFamily: 'monospace',
                padding: '1em'
            }}>
            <h1 css={{
                    textAlign: 'center'
                }}>Documentation</h1>
            <div css={{
                    display: 'flex',
                    alignItems: 'flex-start'
                }}>
                <Navbar links={this.state.files.map(component => component.relativePath)}/>
                <div style={{
                        flex: '0 1 auto',
                        minWidth: 0
                    }}>{docs}</div>
            </div>

        </div>);
    }
}

function propsToString(props) {
    let output = '';
    Object.keys(props).map(key => {
        if (props[key] && key !== 'children')
            output += ` ${key}={${JSON.stringify(props[key])}}`
    });
    return output;
}
