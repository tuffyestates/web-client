import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
/** @jsx jsx */
import {jsx} from '@emotion/core';

import {ProgressiveImage, Editable, LoadingAnimation, Form} from '../../components';

// Formats a numerical price into a localized string
const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
});

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
        const thumbnailImageSrc = this.props.property._id
            ? this.props.previewImage || `${process.env.STATIC_PATH}/property/image/${this.props.property._id}-thumbnail.jpg`
            : undefined;

        // Define path for actual image
        const imageSrc = this.fileInput.current && this.fileInput.current.files[0]
            ? URL.createObjectURL(this.fileInput.current.files[0])
            : this.props.property._id
                ? `${process.env.STATIC_PATH}/property/image/${this.props.property._id}.jpg`
                : undefined;

        return (<div css={{
                width: '100%'
            }}>
            <div css={{
                    position: 'relative'
                }}>
                <ProgressiveImage preview={thumbnailImageSrc} src={imageSrc} css={{
                        height: '30em',
                        objectFit: 'cover',
                        width: '100%'
                    }}/>
                <input ref={this.fileInput} accept="image/*" name="image" type="file" hidden={true} onChange={this.props.onChange}/>
                <EditButton style={{
                        color: 'white',
                        filter: 'drop-shadow(black 1px 1px 1px)',
                        cursor: 'pointer'
                    }} show={this.props.editable} onClick={this.changePhoto}/>
            </div>
            <div css={{
                    backgroundColor: '#000c'
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
                        padding: '1em 0'
                    }}>
                    <Editable.Input required={true} autoFocus={this.props.editable} editable={this.props.editable} onChange={this.props.onChange} name="address" placeholder="Address" value={this.props.property.address} inputStyle={{
                            '::placeholder' : {
                                color: 'white'
                            }
                        }}/>
                    <Editable.Input required={true} editable={this.props.editable} onChange={e => this.props.onChange({
                            target: {
                                name: e.target.name,
                                value: parseLocaleNumber(e.target.value)
                            }
                        })} name="price" placeholder="Price" value={this.props.property.price
                            ? priceFormatter.format(this.props.property.price)
                            : ''} inputStyle={{
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
