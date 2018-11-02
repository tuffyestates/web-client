import React from 'react';
import PropTypes from 'prop-types';

export default class ProgressiveImage extends React.PureComponent {
    state = {
        loaded: false
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className={this.props.className} style={{position: 'relative'}}>
            <img style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }} onLoad={() => this.setState({loaded: true})} src={this.props.src}/>
            <img style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: `blur(${this.props.blur})`,
                    transition: 'opacity ease 0.9s',
                    opacity: this.state.loaded
                        ? '0'
                        : '1'
                }} src={this.props.preview}/></div>);
    }
    static propTypes = {
        /**
         * Amount of blur on preview image
         */
        blur: PropTypes.string,
        /**
         * Link to preview image
         */
        preview: PropTypes.string,
        /**
         * Link to image
         */
        src: PropTypes.string
    };
    static defaultProps = {
        blur: '20px'
    };
    static docProps = {};
}
