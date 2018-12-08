import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import Set from 'lodash.set';

import Colors from '../../colors';
import api from '../../api';
import Property from './';

export default class ViewProperty extends React.Component {
    state = {
        property: {}
    };
    style = {
        header: {
            borderBottom: `1.5px solid ${Colors.orange}`,
            fontWeight: 300
        }
    };
    async componentDidMount() {
        try {
            const response = await api.get(`/properties/${this.props.match.params.id}`);
            // if (response.data.error) {
            //
            // }
            this.setState({property: response.data});
        } catch (err) {
            console.error(err);
        }
    }
    render() {
        return (<Property mode="view" property={this.state.property}/>);
    }
}

function parseLocaleNumber(stringNumber) {
    var thousandSeparator = (1111).toLocaleString().replace(/1/g, '');
    var decimalSeparator = (1.1).toLocaleString().replace(/1/g, '');

    return parseFloat(stringNumber.replace(/^\D*/, '').replace(new RegExp('\\' + thousandSeparator, 'g'), '').replace(new RegExp('\\' + decimalSeparator), '.'));
}
