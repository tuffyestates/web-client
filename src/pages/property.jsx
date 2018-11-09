import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import Set from 'lodash.set';

import Colors from '../colors';
import {ProgressiveImage, Editable, LoadingAnimation} from '../components';
import {Primary} from '../components/button';
import api from '../api';

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

class ImageHeader extends React.PureComponent {
    fileInput = React.createRef();
    uploadPhoto = (e) => {
        this.fileInput.current.click();
    }
    render() {
        let thumbnailImageSrc,
            imageSrc;
        if (this.props.property._id) {
            // Define path for thumbnail (Really low resolution of the actual image)
            thumbnailImageSrc = this.props.previewImage || `${process.env.STATIC_PATH}/property/image/${this.props.property._id}-thumbnail.jpg`;
            // Define path for actual image
            imageSrc = `${process.env.STATIC_PATH}/property/image/${this.props.property._id}.jpg`;
        }

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
                <input ref={this.fileInput} name="image" type="file" hidden={true}/>
                <EditButton style={{
                        color: 'white',
                        filter: 'drop-shadow(black 1px 1px 1px)',
                        cursor: 'pointer'
                    }} show={this.props.editable} onClick={this.uploadPhoto}/>
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
                    <Editable.Input autoFocus={this.props.editable} editable={this.props.editable} onChange={this.props.onChange} name="address" placeholder="Address" value={this.props.property.address} inputStyle={{
                            '::placeholder' : {
                                color: 'white'
                            }
                        }}/>
                    <Editable.Input editable={this.props.editable} onChange={e => this.props.onChange({
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
export default class Property extends React.Component {
    state = {
        property: {
            _id: this.props.match.params.id
        }
    };
    style = {
        header: {
            borderBottom: `1.5px solid ${Colors.orange}`,
            fontWeight: 300
        }
    };
    constructor(props) {
        super(props);
        if (this.props.match.path === '/properties/create') {
            Object.assign(this.state, {
                create: true,
                edit: true,
                property: {
                    address: '',
                    price: ''
                }
            });
        }

        // We are not creating a property listing so loads load the information
        if (!this.state.create) {
            (async () => {
                try {
                    const response = await api.get(`/property/${this.state.property._id}`);
                    // if (response.data.error) {
                    //
                    // }
                    this.setState({
                        property: response.data,
                        edit: this.props.match.path === '/properties/edit'
                    });
                } catch (err) {
                    console.error(err);
                }
            })();
        }

    }
    onChange = (e) => {
        let property = Object.assign({}, this.state.property);
        Set(property, e.target.name, e.target.value);
        this.setState({property});
    }
    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({loading: true});
        try {
            if (this.state.create) {
                const formdata = new FormData(e.currentTarget);
                const response = await api.post(`/property`, formdata);
                // if (response.data.error) {
                //
                // }
                console.log(response)
            } else if (this.state.edit) {
                // Submit changes
            }
        } catch (err) {
            console.error(err);
        }
        this.setState({loading: false});
    }
    render() {
        if (!this.state.create && !this.state.property._id) {
            return (<div css={{display: 'flex', justifyContent: 'center', alignContent: 'center', height: '100%'}}><LoadingAnimation/></div>);
        }

        const submitButton = this.state.edit
            ? (<Primary disabled={this.state.loading} css={{
                    gridColumnEnd: 'span 2',
                    marginTop: '2em'
                }}>{
                    this.state.create
                        ? 'Submit'
                        : 'Save'
                }</Primary>)
            : null;
        const message = this.state.message
            ? (<div>{this.state.message}</div>)
            : null;
        return (<form onSubmit={this.onSubmit}>
            {message}
            <ImageHeader editable={this.state.edit} onChange={this.onChange} previewImage={this.state.previewImage} property={this.state.property}/>
            <div css={{
                    display: 'grid',
                    maxWidth: 1080,
                    boxSizing: 'border-box',
                    padding: '1em',
                    gridColumnGap: '2em',
                    gridTemplateColumns: 'calc(66.6666% - 1em) calc(33.3333% - 1em)',
                    margin: '0 auto',
                    border: '1px solid #eee',
                    fontFamily: 'Roboto',
                    fontWeight: 300
                }}>
                <div css={{
                        gridRowStart: 1,
                        gridRowEnd: 'span 3'
                    }}>
                    <h3 css={this.style.header}>Description</h3>

                    <Editable.Textarea name="description" editable={this.state.edit} onChange={this.onChange} css={{
                            width: '100%'
                        }} value={this.state.property.description} placeholder="Description" textareaStyle={{
                            paddingLeft: 0,
                            paddingRight: 0
                        }}/>
                </div>
                <div>
                    <h3 css={this.style.header}>Specifications</h3>
                    <p>lorem</p>
                </div>
                <div>
                    <h3 css={this.style.header}>Features</h3>
                    <p>lorem</p>
                </div>
                <Primary disabled={this.state.edit}>Contact Owner</Primary>
                {submitButton}
            </div>
        </form>);
    }
}

function parseLocaleNumber(stringNumber) {
    var thousandSeparator = (1111).toLocaleString().replace(/1/g, '');
    var decimalSeparator = (1.1).toLocaleString().replace(/1/g, '');

    return parseFloat(stringNumber.replace(/^\D*/, '').replace(new RegExp('\\' + thousandSeparator, 'g'), '').replace(new RegExp('\\' + decimalSeparator), '.'));
}
