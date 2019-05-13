import React from 'react';
import PropTypes from 'prop-types';

import Colors from '../colors';
import {Lightbox} from './';

export default class Grid extends React.PureComponent {
    state = {};
    style = {
        image: {
            maxWidth: '21.3333333em',
            maxHeight: '12em',
            margin: '0.5em',
            cursor: 'pointer'
        }
    };
    render() {
        const {
            srcs,
            ...passthrough
        } = this.props;
        const images = srcs.map((src, idx) => {
            if (src.endsWith('.mp4')) {
                return (<video key={src} src={src}/>);
            }
            return (<img onClick={() => this.setState({activeIdx: idx})} css={this.style.image} key={idx} src={src}/>);
        });
        return (<div>
            <div {...passthrough} css={{
                    display: "flex",
                    flexWrap: "wrap"
                }}>
                {images}
            </div>
            <Lightbox open={typeof this.state.activeIdx !== 'undefined'} onRequestClose={() => this.setState({activeIdx: undefined})}>
                <img style={{maxHeight: '100%'}} src={this.props.srcs[this.state.activeIdx]}/>
            </Lightbox>
        </div>);
    }
    static propTypes = {
        srcs: PropTypes.array
    };
    static defaultProps = {
        srcs: []
    };
    static docProps = {
        srcs: [
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg'),
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg'),
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg'),
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg'),
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg'),
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg'),
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg'),
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg'),
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg'),
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg'),
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg'),
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg'),
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg'),
            require('!file-loader!../assets/images/alexandre-godreau-1138045-unsplash.jpg')
        ]
    };
}
