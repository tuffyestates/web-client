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
        blur: '20px'
    };
    static docProps = {
        src: 'https://demo.cloudimg.io/width/600/n/https://jolipage.airstore.io/img.jpg',
        preview: 'data:image/jpeg;base64,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'
    };
}
