import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';
import merge from 'deepmerge';

import Colors from '../../colors';
import {Editable, LoadingAnimation,} from '../../components';
import {Primary} from '../../components/button';
import Header from './header';
import {Features, Specifications, Map,} from './details';

export default class Property extends React.Component {
    style = {
        header: {
            borderBottom: `1.5px solid ${Colors.lightOrange}`,
            fontWeight: 300,
        }
    };
    static getDerivedStateFromProps(props, state) {
        return {property: merge({
            _id: '',
            address: '',
            price: '',
            specification: {
                built: '',
                size: '',
                lot: '',
                bathrooms: '',
                bedrooms: ''
            },
            location: {
                lat: '',
                lng: ''
            },
            features: {}
        }, props.property)};
    }
    render() {
        const editable = this.props.mode === 'edit' || this.props.mode === 'create';
        // Loading animation
        if (this.state.property._id === '' && this.props.mode !== 'create') {
            return (<div css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    height: '100%',
                }}><LoadingAnimation/></div>);
        }

        return (<React.Fragment>
            <Header editable={editable} onChange={this.props.onChange} previewImage={this.props.previewImage} property={this.state.property}/>
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
                    fontWeight: 300,
                    backgroundColor: '#fcfcfc'
                }}>
                <div css={{
                        gridRowStart: 1,
                        gridRowEnd: 'span 4',
                    }}>
                    <h3 css={this.style.header}>Description</h3>

                    <Editable.Textarea name="description" required={true} editable={editable} onChange={this.props.onChange} css={{
                            width: '100%'
                        }} value={this.state.property.description} placeholder="Description" textareaStyle={{
                            paddingLeft: 0,
                            paddingRight: 0,
                        }}/>
                </div>
                <div>
                    <h3 css={this.style.header}>Specifications</h3>
                    <Specifications editable={editable} property={this.state.property} onChange={this.props.onChange}/>
                </div>
                <div>
                    <h3 css={this.style.header}>Features</h3>
                    <Features editable={editable} property={this.state.property} onChange={this.props.onChange}/>
                </div>
                <div>
                    <h3 css={this.style.header}>Map</h3>
                    <Map position={[this.state.property.location.lat, this.state.property.location.lng,]}/>
                </div>
                <Primary css={{marginTop: '1em'}} disabled={editable}>Contact Owner</Primary>
            </div>
        </React.Fragment>);
    }
    static propTypes = {
        /**
         * Define if the content should be editable
         */
        mode: PropTypes.oneOf(['edit', 'view', 'create',]).isRequired,
        /**
         * Data about the property
         */
        property: PropTypes.object.isRequired,
        /**
         * Handle input change events
         */
        onChange: PropTypes.func,
    };
}
