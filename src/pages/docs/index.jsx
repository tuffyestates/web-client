import React from 'react';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

// Load a bunch of code processing libraries
import SyntaxHighlighter, {registerLanguage} from "react-syntax-highlighter/dist/prism-light";
import language from 'react-syntax-highlighter/dist/languages/prism/jsx';
import theme from 'react-syntax-highlighter/dist/styles/prism/vs';
registerLanguage('jsx', language);
import {HashLink} from 'react-router-hash-link';

import Colors from '../../colors';
import {Form} from '../../components';
import {debounce} from '../../utils';

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
            const propType = getPropType(prop.type);
            const placeholder = prop.defaultValue
                ? prop.defaultValue.value
                : '';

            const onChange = debounce(e => {
                try {
                    const value = JSON.parse(e.target.value);
                    this.setState({
                        props: {
                            ...this.state.props,
                            [propName]: value,
                        }
                    });
                } catch (err) {
                    if (e.target.value === '') {
                        this.setState({
                            props: {
                                ...this.state.props,
                                [propName]: undefined,
                            }
                        });
                    }
                }
            });

            return (<React.Fragment key={propName}>
                <Form.Input css={{
                        marginBottom: '1em'
                    }} prefix={propName} disabled={propType.startsWith('instanceOf')} suffix={propType} message={prop.description} placeholder={placeholder} defaultValue={JSON.stringify(this.state.props[propName])} onChange={onChange}/>
            </React.Fragment>);
        });

        const example = <this.props.component {...this.state.props}/>;
        return (<div id={this.props.component.name} css={{
                marginBottom: '4em',
                fontSize: '1.1em',
                borderLeft: `0.4em solid ${Colors.darkOrange}`,
            }}>
            <h3 css={{
                    padding: '0.5em 1.2em',
                    marginTop: '1em',
                    backgroundColor: 'white',
                    borderBottom: `1px solid lightgrey`,
                    position: 'relative',
                    '::after': {
                        content: 'close-quote',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: '0.4em',
                        backgroundColor: Colors.darkOrange,
                        clipPath: 'polygon(0 0, 100% 0%, 0% 100%)',
                    }
                }}>{details.displayName}</h3>
            <div css={{
                paddingLeft: '2em'
                }}>{description}

                <h3>Props:</h3>
                <div css={{
                        borderTop: '1px dashed lightgrey',
                        borderBottom: '1px dashed lightgrey',
                        padding: '1em',
                    }}>{props}</div>

                <h3>Example:</h3>
                <SyntaxHighlighter language='javascript' style={theme} css={{
                        marginBottom: '0 !important',
                        border: '1px solid lightgrey',
                        borderBottom: 'none',
                        overflow: 'auto',
                    }}>{`<${details.displayName}${propsToString(this.state.props)}/>`}</SyntaxHighlighter>
                <div css={{
                        backgroundColor: '#efefef',
                        border: '1px solid lightgrey',
                        padding: '1em',
                        position: 'relative',
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
                    fontSize: '1.6em',
                    padding: '0.5em 1em',
                    marginTop: '2em',
                    marginBottom: '1.3em',
                    boxShadow: '0 5px 6px -2px #0000004d',
                }}>{this.props.fileName}</h2>
            <div css={{paddingLeft: '1em'}}>{components}</div>
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
                    color: 'white',
                },
            }} key={linkName} to={`#${linkName}`}>{linkName}</HashLink>));
        return (<div css={{
                position: 'sticky',
                top: 0,
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
                padding: '1em',
            }}>
            <h1 css={{
                    textAlign: 'center'
                }}>Documentation</h1>
            <div css={{
                    display: 'flex',
                    alignItems: 'flex-start',
                }}>
                <Navbar links={this.state.files.map(component => component.relativePath)}/>
                <div style={{
                        flex: '0 1 auto',
                        minWidth: 0,
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

function getPropType(type) {
    switch (type.name) {
        case 'union':
            return `[${type.value.map(x => x.name).join(' | ')}]`;
        case 'instanceOf':
            return `instanceOf ${type.value}`;
        default:
            return type.name;
    }
}
