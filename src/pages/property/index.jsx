import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';

import Colors from '../../colors';
import {Editable, LoadingAnimation} from '../../components';
import {Primary} from '../../components/button';
import Header from './header';
import {Features, Specifications} from './details';

export default class Property extends React.Component {
    style = {
        header: {
            borderBottom: `1.5px solid ${Colors.orange}`,
            fontWeight: 300
        }
    };
    render() {
        const editable = this.props.mode === 'edit' || this.props.mode === 'create';

        // Loading animation
        if (typeof this.props.property._id === 'undefined') {
            return (<div css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    height: '100%'
                }}><LoadingAnimation/></div>);
        }

        return (<React.Fragment>
            <Header editable={editable} onChange={this.props.onChange} previewImage={this.props.previewImage} property={this.props.property}/>
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

                    <Editable.Textarea name="description" required={true} editable={editable} onChange={this.props.onChange} css={{
                            width: '100%'
                        }} value={this.props.property.description} placeholder="Description" textareaStyle={{
                            paddingLeft: 0,
                            paddingRight: 0
                        }}/>
                </div>
                <div>
                    <h3 css={this.style.header}>Specifications</h3>
                    <Specifications editable={editable} property={this.props.property} onChange={this.props.onChange}/>
                </div>
                <div>
                    <h3 css={this.style.header}>Features</h3>
                    <Features editable={editable} property={this.props.property} onChange={this.props.onChange}/>
                </div>
                <Primary disabled={editable}>Contact Owner</Primary>
            </div>
        </React.Fragment>);
    }
    static propTypes = {
        /**
         * Define if the content should be editable
         */
        mode: PropTypes.oneOf(['edit', 'view', 'create']).isRequired,
        /**
         * Data about the property
         */
        property: PropTypes.object.isRequired,
        /**
         * Handle input change events
         */
        onChange: PropTypes.func
    };
}

function parseLocaleNumber(stringNumber) {
    var thousandSeparator = (1111).toLocaleString().replace(/1/g, '');
    var decimalSeparator = (1.1).toLocaleString().replace(/1/g, '');

    return parseFloat(stringNumber.replace(/^\D*/, '').replace(new RegExp('\\' + thousandSeparator, 'g'), '').replace(new RegExp('\\' + decimalSeparator), '.'));
}
