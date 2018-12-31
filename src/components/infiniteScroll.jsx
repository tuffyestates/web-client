import React from 'react';
import PropTypes from 'prop-types';

/**
 * Load new data only when the user has scrolled to the bottom of the container.
 */
export default class InfiniteScroll extends React.PureComponent {
    loadingMore = false;
    constructor(props) {
        super(props);
        this.container = React.createRef();
    }
    async componentDidMount() {
        await this.props.loadMore()

        // Listen for scroll events
        this.container.current.addEventListener('scroll', this.handleScroll, {passive: true});
    }
    componentWillUnmount() {
        this.container.current.removeEventListener('scroll', this.handleScroll, {passive: true});
    }
    handleScroll = throttle(async (e) => {
        if (this.loadingMore)
            return;

        const container = e.target;

        // Time to see if the scroll is within our target
        if (container.scrollTop + container.clientHeight >= container.scrollHeight - this.props.offset) {
            this.loadingMore = true;

            // Container has been scrolled into a position where we should load new content
            await this.props.loadMore();
            this.loadingMore = false;
        }
    });
    render() {
        const {
            loadMore: _,
            children,
            ...passThroughProps
        } = this.props;
        // onWheel={this.handleScroll.bind(this)}
        return (<div css={{
                overflow: 'auto'
            }} {...passThroughProps} ref={this.container}>
            {children}
        </div>);
    }
    static propTypes = {
        /**
         * Function called when new data is requested
         */
        loadMore: PropTypes.instanceOf(Function).isRequired,
        /**
         * Offset from bottom of scroll when more should be loaded
         */
        offset: PropTypes.number,
    };
    static defaultProps = {
        offset: 10
    };
    static docProps = {
        children: Array.from({
            length: 100
        }, (e, idx) => <div key={idx}>{idx}</div>),
        loadMore: () => undefined,
        css: {
            height: 200
        },
    };
}

// https://gist.github.com/beaucharman/e46b8e4d03ef30480d7f4db5a78498ca
function throttle(callback, wait = 200, context = this) {
    let timeout = null,
        callbackArgs = null;

    const later = () => {
        callback.apply(context, callbackArgs);
        timeout = null;
    };

    return function throttled() {
        if (!timeout) {
            callbackArgs = arguments;
            timeout = setTimeout(later, wait);
        }
    };
}
