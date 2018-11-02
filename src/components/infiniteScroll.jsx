import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';

/**
 * Load new data only when the user has scrolled to the bottom of the container.
 */
export default class InfiniteScroll extends React.PureComponent {
    state = {
        content: [],

        // False is set to true when no new data was returned on a loadMore call. That way we don't keep calling.
        done: false
    };
    constructor(props) {
        super(props);
        this.container = React.createRef();
    }
    async componentDidMount() {
        // Add new content to current content
        const content = this.state.content.concat(await this.props.loadMore(this.state.content.length));
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

        // Time to see if the scroll is within our target
        if (container.scrollTop + container.clientHeight > container.scrollHeight - this.props.offset) {
            let done = false;

            // Container has been scrolled into a position where we should load new content
            const newContent = await this.props.loadMore(this.state.content.length);

            // No new content, don't try to load more content again
            if (newContent.length === 0)
                done = true;

            // Add new content to old content
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
        loadMore: PropTypes.instanceOf(Function).isRequired,
        /**
         * Location of scroll in which loadMore is called
         */
        offset: PropTypes.number
    };
    static defaultProps = {
        offset: 300
    };
    static docProps = {
        loadMore: () => []
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
