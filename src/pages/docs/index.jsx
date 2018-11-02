import React from 'react';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
/** @jsx jsx */
import {jsx} from '@emotion/core';

// Load a bunch of code processing libraries
import SyntaxHighlighter, {registerLanguage} from "react-syntax-highlighter/prism-light";
import language from 'react-syntax-highlighter/languages/prism/jsx';
import theme from 'react-syntax-highlighter/styles/prism/vs';
registerLanguage('jsx', language);

import Colors from '../../colors';
import {Input} from '../../components';
import Parser from './parser.worker';

// Find all components and load their sources
const ComponentSources = require.context('!raw-loader!../../components/', false, /\.jsx$/);
const Components = require.context('../../components/', false, /\.jsx$/);

class Comp extends React.PureComponent {
    state = {
        parser: new Parser(),
        component: null,
        props: this.props.component.docProps || {},
        details: {displayName: 'Loading...'}
    };
    constructor(props) {
        super(props);
        this.state.parser.onmessage = e => {
            this.setState({details: e.data});
        };
        this.state.parser.postMessage(props.source);
    }

    render() {
        const details = this.state.details;
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
                <Input css={{
                        marginBottom: '1em',
                    }} prefix={propName} suffix={propType} message={prop.description} placeholder={placeholder} defaultValue={JSON.stringify(this.state.props[propName])} onChange={onChange}/>
            </React.Fragment>);
        });

        const example = <this.props.component {...this.state.props}/>;
        return (<div css={{
                marginBottom: '4em',
                fontSize: '1.1em'
            }}>
            <h2 css={{
                    backgroundImage: `linear-gradient(to right, ${Colors.darkblue}, ${Colors.blue})`,
                    color: 'white',
                    padding: '0.5em 1em',
                    marginTop: '2em',
                    boxShadow: '0 5px 6px -2px #0000004d'
                }}>{details.displayName}</h2>
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

export default class Docs extends React.PureComponent {
    constructor(props) {
        super(props);
        const components = Components.keys().map(componentPath => ({component: Components(componentPath).default, source: ComponentSources(componentPath)}));
        this.state = {
            components
        };
    }
    render() {
        const docs = this.state.components.map(component => (<Comp key={component.component.name} component={component.component} source={component.source}/>));
        return (<div css={{
                fontFamily: 'monospace',
                padding: '1em'
            }}>
            <h1 css={{
                    textAlign: 'center'
                }}>Documentation</h1>
            {docs}
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
