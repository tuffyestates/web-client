import React from 'react';
import Colors from '../../colors';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';
import Search from './search.worker.js';

export default class AutoComplete extends React.PureComponent {
    state = {
        value: this.props.defaultValue || '',
        results: []
    };
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }
    onSearchResults = (event) => this.setState({
        results: event.data.slice(0, this.props.maxNumResults)
    });
    static getDerivedStateFromProps(props, state) {
        const searcher = state.searcher || new Search();
        searcher.postMessage({type: 'init', settings: props.settings, data: props.data});
        return {searcher};
    }
    componentDidMount() {
        this.state.searcher.onmessage = this.onSearchResults;
        this.state.searcher.sendMessage = debounce(this.state.searcher.postMessage);
    }
    search = (e, cb) => {
        this.state.searcher.sendMessage({type: 'search', value: e.target.value});
        this.setState({
            value: e.target.value
        }, cb);
    }
    render() {
        const results = this.state.results.map(result => <div key={result.name + result.description} onClick={() => this.setState({
                value: result.name,
                results: []
            }, () => this.input.current.focus())} css={{
                padding: '0.5em',
                cursor: 'pointer',
                display: 'flex',
                color: '#333',
                justifyContent: 'space-between',
                ':hover' : {
                    backgroundColor: Colors.blue,
                    color: 'white',
                    span: {
                        color: 'white !important'
                    }
                }
            }}>
            <span>{result.name}</span>
            <span style={{
                    color: 'grey'
                }}>{result.description}</span>
        </div>);
        return (<div css={{
                minWidth: 0,
                position: 'relative',
                'input:focus + div' : {
                    display: 'block'
                }
            }} className={this.props.className}>
            <input ref={this.input} placeholder={this.props.placeholder} value={this.state.value} onChange={this.search} css={{
                    flex: 1,
                    padding: '0.5em 0.8em',
                    border: 'none',
                    display: 'block',
                    width: '100%',
                    boxSizing: 'border-box',
                    minWidth: 0,
                    '::placeholder' : {
                        color: '#A8A8A8'
                    },
                    ...this.props.inputStyle
                }}/>
            <div css={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    display: 'none',
                    backgroundColor: 'white',
                    overflow: 'auto',
                    borderTop: '1px solid lightgrey',
                    boxShadow: '0 8px 15px -18px black inset',
                    ':hover' : {
                        display: 'block !important'
                    }
                }}>{results}</div>
        </div>);
    }
    static propTypes = {
        /**
         * Styles to be applied to the inner input dom node.
         */
        inputStyle: PropTypes.object,
        /**
         * Maximum number of results to display.
         */
        maxNumResults: PropTypes.number,
        /**
         * Data to be matched against. Passed to fuse.
         */
        data: PropTypes.array,
        /**
         * A settings object passed to [fuse]{@link http://fusejs.io/}.
         */
        settings: PropTypes.object
    };
    static defaultProps = {
        maxNumResults: 5
    };
    static docProps = {
        settings: {
            keys: ['name', 'state']
        },
        data: [
            {
                "name": "Autauga",
                "description": "Alabama",
                "id": "01001"
            }, {
                "name": "Baldwin",
                "description": "Alabama",
                "id": "01003"
            }, {
                "name": "Barbour",
                "description": "Alabama",
                "id": "01005"
            }, {
                "name": "Bibb",
                "description": "Alabama",
                "id": "01007"
            }, {
                "name": "Blount",
                "description": "Alabama",
                "id": "01009"
            }, {
                "name": "Bullock",
                "description": "Alabama",
                "id": "01011"
            }
        ]
    };
}

// Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait = 200, immediate = false) {
    let timeout;

    return function executedFunction() {
        const context = this, args = arguments;

        const later = function() {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
            };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow)
            func.apply(context, args);
        };
}
