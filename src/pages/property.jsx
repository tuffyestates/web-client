import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import Set from 'lodash.set';

import Colors from '../colors';
import {ProgressiveImage, Editable} from '../components';
import {Primary} from '../components/button';

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
            }} className={this.props.className} style={this.props.style} onClick={this.props.onClick} icon={['far', 'edit']}/>);
    }
}

class ImageHeader extends React.Component {
    fileInput = React.createRef();
    uploadPhoto = (e) => {
        this.fileInput.current.click();
    }
    render() {

        // Define path for thumbnail (Really low resolution of the actual image)
        const thumbnailImageSrc = this.props.previewImage || `${process.env.STATIC_PATH}/property/image/${this.props.property.id}-thumbnail.jpg`;

        // Define path for actual image
        const imageSrc = `${process.env.STATIC_PATH}/property/image/${this.props.property.id}.jpg`;

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
                <input ref={this.fileInput} name="property.image" type="file" hidden={true}/>
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
                    <Editable.Input editable={this.props.editable} onChange={this.props.onChange} name="property.address" placeholder="Address" value={this.props.property.address} inputStyle={{
                            '::placeholder' : {
                                color: 'white'
                            }
                        }}/>
                    <Editable.Input editable={this.props.editable} onChange={this.props.onChange} name="property.price" placeholder="Price" value={this.props.property.price} inputStyle={{
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
            id: this.props.match.params.id
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
        if (this.state.property.id === 'create') {
            this.state.edit = true;
            this.state.create = true;
            Object.assign(this.state, {
                address: '',
                price: ''
            });
        }

        if (this.state.property.id !== 'create')
            setTimeout(() => {
                this.setState({
                    property: {
                        id: this.state.property.id,
                        homeType: 'Houses',
                        address: '6231 Hacienda Pl',
                        city: 'Hollywood',
                        state: 'CA',
                        bedroom: 4,
                        bathroom: 3,
                        price: 850000,
                        squareFeet: 3115,
                        lotSize: 4312,
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel consequat tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed viverra tincidunt ex in pretium. Quisque iaculis sem eu sagittis pellentesque. Curabitur porta sed ligula in pellentesque. Morbi fermentum aliquam urna eu lobortis. Donec pellentesque massa vel est maximus, ut finibus sem condimentum. Donec a fermentum ligula. Nulla efficitur maximus mauris in suscipit. Duis aliquam gravida dui, et consectetur ligula ornare ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc luctus dolor et fringilla dictum.'
                    }
                });
            }, 500);

        }
    onChange = (e) => {
        let state = Object.assign({}, this.state);
        Set(state, e.target.name, e.target.value);
        this.setState(state);
    }
    render() {

        return (<form>
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

                    <Editable.Textarea name="property.description" editable={this.state.edit} onChange={this.onChange} css={{
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
                <Primary css={{
                        gridColumnEnd: 'span 2',
                        marginTop: '2em'
                    }}>{
                        this.state.create
                            ? 'Submit'
                            : 'Save'
                    }</Primary>
            </div>
        </form>);
    }
}
