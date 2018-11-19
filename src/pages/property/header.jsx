import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
/** @jsx jsx */
import { jsx } from '@emotion/core';

import { ProgressiveImage, Editable } from '../../components';

class EditButton extends React.PureComponent {
    render() {
        return (<FontAwesomeIcon css={{
                position: 'absolute',
                zIndex: 2,
                padding: '1em',
                top: 0,
                right: 0,
                display: this.props.show
                    ? 'block'
                    : 'none'
            }} className={this.props.className} style={this.props.style} onClick={this.props.onClick} icon={faEdit}/>);
    }
}

export default class ImageHeader extends React.PureComponent {
    fileInput = React.createRef();
    changePhoto = (e) => {
        this.fileInput.current.click();
    }
    render() {
        // Define path for thumbnail (Really low resolution of the actual image)
        const thumbnailImageSrc = this.props.property._id ?
            this.props.previewImage || `${process.env.STATIC_PATH}/property/image/${this.props.property._id}-thumbnail.jpg` :
            undefined;

        // Define path for actual image
        const imageSrc = this.fileInput.current && this.fileInput.current.files[0] ?
            URL.createObjectURL(this.fileInput.current.files[0]) :
            this.props.property._id ?
            `${process.env.STATIC_PATH}/property/image/${this.props.property._id}.jpg` :
            undefined;

        return (<div css={{
                height: '30em',
                position: 'relative'
            }}>
            <ProgressiveImage preview={thumbnailImageSrc} src={imageSrc} css={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    position: 'absolute'
                }}/>
            <input style={{
                    display: 'none'
                }} ref={this.fileInput} accept="image/*" name="image" type="file" required={true} hidden={true} onChange={this.props.onChange}/>
            <EditButton style={{
                    color: 'white',
                    filter: 'drop-shadow(black 1px 1px 1px)',
                    cursor: 'pointer'
                }} show={this.props.editable} onClick={this.changePhoto}/>
            <div css={{
                    backgroundColor: '#000b',
                    bottom: 0,
                    position: 'absolute',
                    zIndex: 3,
                    left: 0,
                    right: 0
                }}>
                <div css={{
                        maxWidth: 1080,
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: 'white',
                        fontFamily: 'Roboto',
                        fontWeight: 300,
                        fontSize: '1.2em',
                        padding: '0.5em 0'
                    }}>
                    <Editable.Input required autoFocus={this.props.editable} editable={this.props.editable} onChange={this.props.onChange} css={{flex: 1}} name="address" placeholder="Address" value={this.props.property.address} inputStyle={{
                            '::placeholder' : {
                                color: 'white'
                            }
                        }}/>
                    <Editable.Input required editable={this.props.editable} onChange={this.props.onChange} css={{flex: 1}} name="price" placeholder="Price" value={this.props.property.price} inputStyle={{
                            direction: 'rtl',
                            textAlign: 'right',
                            '::placeholder' : {
                                color: 'white'
                            }
                        }}/>
                </div>
            </div>
        </div>);
    }
}

export function parseLocaleNumber(stringNumber) {
    var thousandSeparator = (1111).toLocaleString().replace(/1/g, '');
    var decimalSeparator = (1.1).toLocaleString().replace(/1/g, '');

    return parseFloat(stringNumber.replace(/^\D*/, '').replace(new RegExp('\\' + thousandSeparator, 'g'), '').replace(new RegExp('\\' + decimalSeparator), '.'));
}
