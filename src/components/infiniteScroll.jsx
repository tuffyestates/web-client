import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';

export default class InfiniteScroll extends React.PureComponent {
    state = {
        content: [],
        done: false
    };
    constructor(props) {
        super(props);
        this.container = React.createRef();
    }
    async componentDidMount() {
        const content = this.state.content.concat(await this.props.onLoad(this.state.content.length));
        this.setState({content});

        // Listen for scroll events
        this.container.current.addEventListener('scroll', this.handleScroll.bind(this), {passive: true});
    }
    componentWillUnmount() {
        this.container.current.removeEventListener('scroll', this.handleScroll.bind(this), {passive: true});
    }
    handleScroll = throttle(async(e) => {
        // If we have already loaded everything that exists
        if (this.state.done)
            return;

        const container = e.target;
        if (container.scrollTop + container.clientHeight > container.scrollHeight - this.props.offset) {
            let done = false;

            const newContent = await this.props.onLoad(this.state.content.length);

            // No new content, don't try to load more content again
            if (newContent.length === 0)
                done = true;

            const content = this.state.content.concat(newContent);
            this.setState({content, done});
        }
    });
    render() {
        // onWheel={this.handleScroll.bind(this)}
        return (<div {...this.props} ref={this.container}>
            {this.state.content}
            {this.props.children}
        </div>);
    }
    static propTypes = {
        /**
         * Function called when new data is requested
         */
        onLoad: PropTypes.instanceOf(Function).isRequired,
        /**
         * Location of scroll in which onLoad is called
         */
        offset: PropTypes.number
    };
    static defaultProps = {
        offset: 300
    };
    static docProps = {
        onLoad: () => []
    };
}

// https://gist.github.com/beaucharman/e46b8e4d03ef30480d7f4db5a78498ca
function throttle(callback, wait = 200, context = this) {
    let timeout = null, callbackArgs = null;

    const later = () => {
        callback.apply(context, callbackArgs);
        timeout = null;
    };

    return function() {
        if (!timeout) {
            callbackArgs = arguments;
            timeout = setTimeout(later, wait);
        }
    }
}
