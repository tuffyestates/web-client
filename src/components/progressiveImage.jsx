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
    render() {
        const offset = this.state.loaded ? 0: `-${this.props.blur * 2}px`;
        const offsetSize = this.state.loaded ? '100%': `calc(100% + ${this.props.blur * 4}px)`;
        return (<div className={this.props.className} style={{
                position: 'relative',
                overflow: 'hidden'
            }}>
            <img style={{
                    width: offsetSize,
                    height: offsetSize,
                    position: 'absolute',
                    top: offset,
                    left: offset,
                    right: offset,
                    bottom: offset,
                    objectFit: 'cover'
                }} onLoad={() => this.setState({loaded: true})} src={this.props.src}/>
            <FallbackImage style={{
                    width: offsetSize,
                    height: offsetSize,
                    position: 'relative',
                    top: offset,
                    left: offset,
                    objectFit: 'cover',
                    display: 'block',
                    filter: `blur(${this.props.blur}px)`,
                    transition: 'opacity ease 0.9s',
                    opacity: this.state.loaded
                        ? 0
                        : 1
                }} src={this.props.preview}/></div>);
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
