import React from 'react';
import PropTypes from 'prop-types';
import Vivus from 'vivus';

export default class LoadingAnimation extends React.PureComponent {
    state = {
        loaded: false
    };
    componentDidMount() {
        this.vivus = new Vivus("svg-loading", {
            duration: this.props.duration,
            // Start the animation when ready
            start: 'autostart',
            onReady: () => {
                this.setState({loaded: true});
            }
            // Callback on vivus finish
            // We restart the animation in reverse when vivus finished
        }, function(v) {
            v.play(
                v.getStatus() === 'end'
                ? -1
                : 1);
        });
    }
    componentWillUnmount() {
        if (this.vivus) {
            // Remove vivus instance on component dismount
            this.vivus.destroy();
        }
    }
    render() {
        return (<object id="svg-loading" style={{
                // Hide svg as vivus loads
                visibility: this.state.loaded
                    ? 'visible'
                    : 'hidden'
            }} data={SVG}/>);
    }
    static propTypes = {
        /**
         * Link to fallback image
         */
        duration: PropTypes.number
    };
    static defaultProps = {
        duration: 400
    };
    static docProps = {};
}

// https://stackoverflow.com/questions/12168909/blob-from-dataurl
function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
}

// This is required because without a url you can't access the inner svg wrapped in a object node
const SVG = URL.createObjectURL(dataURItoBlob(require('../assets/images/missing-house.svg')));
