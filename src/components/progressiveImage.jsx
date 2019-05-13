import React from 'react';
import PropTypes from 'prop-types';
import {FallbackImage} from './';

export default class ProgressiveImage extends React.PureComponent {
    state = {
        loaded: false
    };
    constructor(props) {
        super(props);
    }
    imageLoaded = () => {
        // Double requestAnimationFrame because we want to wait for the image to finish rendering
        requestAnimationFrame(() => requestAnimationFrame(() => this.setState({loaded: true})));
    }
    loadFailed = () => {
        this.setState({loaded: false});
    }
    render() {
        const offset = this.state.loaded
            ? 0
            : -this.props.blur * 2;
        const offsetSize = this.state.loaded
            ? '100%'
            : `calc(100% + ${this.props.blur * 4}px)`;
        return (<div className={this.props.className} style={{
                position: 'relative',
                overflow: 'hidden'
            }}>
            <FallbackImage style={{
                    width: offsetSize,
                    height: offsetSize,
                    objectFit: 'cover',
                    display: 'block',
                    filter: `blur(${this.props.blur}px)`,
                    margin: offset,
                    // Force GPU rendering
                    transform: `translateZ(1px)`,
                    transition: 'all ease 0.9s',
                    zIndex: 1,
                    opacity: this.state.loaded
                        ? 0
                        : 1
                }} src={this.props.preview}/>
            <img style={{
                    width: offsetSize,
                    height: offsetSize,
                    position: 'absolute',
                    top: offset,
                    left: offset,
                    right: offset,
                    bottom: offset,
                    transition: 'all ease 0.9s',
                    objectFit: 'cover'
                }} onLoad={this.imageLoaded} onError={this.loadFailed} src={this.props.src}/></div>);
    }
    static propTypes = {
        /**
         * Amount of blur on preview image
         */
        blur: PropTypes.number,
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
        blur: 20
    };
    static docProps = {};
}
