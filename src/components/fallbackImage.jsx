import React from 'react';
import PropTypes from 'prop-types';

export default class FallbackImage extends React.PureComponent {
    render() {
        return (<img onError={e => e.target.src=(this.props.fallback)} {...this.props}/>);
    }
    static propTypes = {
        /**
         * Link to fallback image
         */
        fallback: PropTypes.string,
        /**
         * Link to image
         */
        src: PropTypes.string,
    };
    static defaultProps = {
        fallback: require('../assets/images/placeholder.svg'),
    };
    static docProps = {
        src: 'abc',
    };
}
