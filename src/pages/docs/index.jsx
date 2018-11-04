import React from 'react';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Link} from 'react-router-dom';

// Load a bunch of code processing libraries
import SyntaxHighlighter, {registerLanguage} from "react-syntax-highlighter/prism-light";
import language from 'react-syntax-highlighter/languages/prism/jsx';
import theme from 'react-syntax-highlighter/styles/prism/vs';
registerLanguage('jsx', language);

import Colors from '../../colors';
import {Form} from '../../components';
import Parser from './parser.worker';

// Find all components and load their sources
const ComponentSources = require.context('!raw-loader!../../components/', false, /\.jsx$/);
const Components = require.context('../../components/', false, /\.jsx$/);

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
                    // eslint-disable-next-line no-empty
                } catch (e) {}
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
                        borderBottom: 'none'
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
    parser = new Parser();
    state = {
        components: []
    };
    constructor(props) {
        super(props);
        this.parser.onmessage = e => {
            this.setState({components: e.data});
        };
        this.parser.postMessage(props.source);
    }

    render() {
        // FIXME: this.state.components contains unexported classes, like Link
        // from navbar.jsx
        const components = this.state.components.map(c => {
            const component = this.props.fileComponents[c.displayName] || this.props.fileComponents.default;
            return (<Component key={c.displayName} component={component} details={c}/>);
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
        const links = this.props.links.map(linkName => (<span css={{
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
            }} key={linkName} onClick={() => this.goTo(linkName)}>{linkName}</span>));
        return (<div css={{
                position: 'sticky',
                top: 0
            }} className={this.props.className}>{links}</div>);
    }
}

export default class Docs extends React.PureComponent {
    state = {
        files: []
    };
    constructor(props) {
        super(props);
        const files = Components.keys().map(componentPath => ({path: componentPath, fileComponents: Components(componentPath), source: ComponentSources(componentPath)}));
        this.state = {
            files
        };
    }
    render() {
        const docs = this.state.files.map(f => (<ComponentFile key={f.path} fileName={f.path} fileComponents={f.fileComponents} source={f.source}/>));
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
                <Navbar css={{
                        width: 200
                    }} links={this.state.files.map(component => component.path)}/>
                <div style={{
                        flex: 1
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
