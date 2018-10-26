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
    };
    static defaultProps = {
        fallback: require('../images/placeholder.svg')
    };
}
