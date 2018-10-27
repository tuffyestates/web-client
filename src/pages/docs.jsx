import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
/** @jsx jsx */
import { jsx } from '@emotion/core';

import Colors from '../colors';
import * as Components from '../components';

class Comp extends React.PureComponent {
    state = {};
    component = null;
    async componentDidMount() {
        const {default: SyntaxHighlighter, registerLanguage} = await import (/* webpackChunkName: "docs" */
        "react-syntax-highlighter/prism-light");
        const language = (await import (/* webpackChunkName: "docs" */
        'react-syntax-highlighter/languages/prism/jsx')).default;
        const theme = (await import (/* webpackChunkName: "docs" */
        'react-syntax-highlighter/styles/prism/vs')).default;
        registerLanguage('jsx', language);

        const componentProps = this.props.component.props || {};
        const description = this.props.component.description
            ? <h4>component.description</h4>
            : null;
        const props = Object.keys(componentProps).map(propName => {
            const prop = componentProps[propName];

            return (<React.Fragment key={propName}>
                <Components.Input prefix={propName} suffix={prop.type.name === 'union'
                        ? `[${prop.type.value.map(x => x.name).join(', ')}]`
                        : prop.type.name} message={prop.description} placeholder={prop.defaultValue
                        ? prop.defaultValue.value
                        : ''} onChange={(e) => this.setState({
                        ...this.state,
                        [propName]: e.target.value
                    })}/>
            </React.Fragment>);
        });
        const Example = Components[this.props.component.displayName];

        this.component = (<div css={{
                marginBottom: '4em'
            }} {...this.props}>
            <h2 css={{
                    backgroundColor: Colors.darkblue,
                    color: 'white',
                    padding: '0.5em',
                    borderBottom: '1px solid lightgrey',
                    marginTop: '2em'
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
                    }}>{`<${this.props.component.displayName}${propsToString(this.state)} />`}</SyntaxHighlighter>
                <div css={{
                        backgroundColor: '#efefef',
                        border: '1px solid lightgrey',
                        padding: '1em',
                        position: 'relative'
                    }}><Example {...this.state}/></div>
            </div>
        </div>);

        this.forceUpdate();
    }
    render() {
        return this.component;
    }
}

export default class Docs extends React.PureComponent {
    state = {
        details: {}
    };

    async componentDidMount() {

        // Load parser
        const parse = (await import (/* webpackChunkName: "docs" */
        'react-docgen')).parse;

        let details = {};
        // Load all components raw text async
        const components = await importAll(require.context('../components/', false, /\.jsx$/), components);

        // Parse each component
        for (const [filename, component] of Object.entries(components)) {
            details[filename] = parse(component);
        }
        this.setState({details});
    }
    render() {
        console.log(this.state.details)
        const docs = Object.keys(this.state.details).map(key => <Comp key={key} component={this.state.details[key]}/>);
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
        if (props[key])
            output += ` ${key}={${props[key]}}`
    });
    return output;
}

async function importAll(context) {
    let promises = [],
        cache = {};
    context.keys().forEach(filename => {
        promises.push(new Promise(async (res, rej) => {
            try {
                cache[filename] = (await import (/* webpackChunkName: "docs" */
                `!raw-loader!../components/${filename.substr(2)}`)).default;
                return res();
            } catch (e) {
                return rej(e);
            }
        }));
    });
    await Promise.all(promises);
    return cache;
}
