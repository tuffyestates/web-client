import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import SyntaxHighlighter, {registerLanguage} from/* webpackChunkName: "docs" */
"react-syntax-highlighter/prism-light";
import language from/* webpackChunkName: "docs" */
'react-syntax-highlighter/languages/prism/jsx';
import theme from/* webpackChunkName: "docs" */
'react-syntax-highlighter/styles/prism/vs';
import {parse} from/* webpackChunkName: "docs" */
'react-docgen';
registerLanguage('jsx', language);

import Colors from '../colors';
import * as Components from '../components';

class Comp extends React.PureComponent {
    state = {
        component: null,
        props: Components[this.props.component.displayName].docProps || {}
    };
    render() {
        const Example = Components[this.props.component.displayName];

        const componentProps = this.props.component.props || {};
        const description = this.props.component.description
            ? <h4>component.description</h4>
            : null;

        const props = Object.keys(componentProps).map(propName => {
            const prop = componentProps[propName];
            const propType = prop.type.name === 'union'
                ? `[${prop.type.value.map(x => x.name).join(' | ')}]`
                : prop.type.name;
            const placeholder = prop.defaultValue
                ? prop.defaultValue.value
                : '';
            const onChange = (e) => this.setState({
                props: {
                    ...this.state.props,
                    [propName]: JSON.parse(e.target.value)
                }
            });

            return (<React.Fragment key={propName}>
                <Components.Input css={{
                        marginBottom: '1em'
                    }} prefix={propName} suffix={propType} message={prop.description} placeholder={placeholder} defaultValue={JSON.stringify(this.state.props[propName])} onChange={onChange}/>
            </React.Fragment>);
        });
        const example = <Example {...this.state.props}/>;
        return (<div css={{
                marginBottom: '4em',
                fontSize: '1.1em',
            }} {...this.props}>
            <h2 css={{
                    backgroundImage: `linear-gradient(to right, ${Colors.darkblue}, ${Colors.blue})`,
                    color: 'white',
                    padding: '0.5em 1em',
                    marginTop: '2em',
                    boxShadow: '0 5px 6px -2px #0000004d',
                }}>{this.props.component.displayName}</h2>
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
                    }}>{`<${this.props.component.displayName}${propsToString(this.state.props)}/>`}</SyntaxHighlighter>
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
    render() {
        // Load all components raw text async
        const components = importAll(require.context('../components/', false, /\.jsx$/), components);

        let details = {};
        // Parse each component
        for (const [filename, component] of Object.entries(components)) {
            details[filename] = parse(component);
        }

        const docs = Object.keys(details).sort().map(key => (<Comp key={key} component={details[key]}/>));
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

function importAll(context) {
    let cache = {};
    context.keys().forEach(key => cache[key] = require(`!raw-loader!../components${key.substr(1)}`));
    return cache;
}
