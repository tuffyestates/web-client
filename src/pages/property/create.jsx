import React from 'react';
import Set from 'lodash.set';

import Colors from '../../colors';
import api from '../../api';
import {Primary} from '../../components/button';
import Property from './';

export default class CreateProperty extends React.Component {
    state = {
        property: {}
    };
    style = {
        header: {
            borderBottom: `1.5px solid ${Colors.orange}`,
            fontWeight: 300
        }
    };
    onChange = (e) => {
        let property = Object.assign({}, this.state.property);
        Set(property, e.target.name, e.target.value || e.target.files);
        this.setState({property});
    }
    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({loading: true, message: undefined});
        console.debug("Submitting listing!");
        try {
            const formdata = new FormData(e.currentTarget);
            for (const a of formdata) {
                console.debug(a)
            }
            const response = await api.post(`/properties`, formdata);
            // if (response.data.error) {
            //
            // }
            console.debug(response)
        } catch (err) {
            console.error(err);
            this.setState({message: err.response.data.error});
        }
        this.setState({loading: false});
    }
    render() {
        return (<form onSubmit={this.onSubmit} onError={console.error}>
            <Property mode="create" property={this.state.property} onChange={this.onChange}/>
            <div css={{maxWidth: 1080, margin: '0 auto'}}>
                <Primary disabled={this.state.loading} type="submit" css={{
                    gridColumnEnd: 'span 2',
                    width: '100%',
                    marginBottom: '1em'
                }}>Post Listing</Primary>
            </div>
            {this.state.message}
        </form>);
    }
}

function parseLocaleNumber(stringNumber) {
    var thousandSeparator = (1111).toLocaleString().replace(/1/g, '');
    var decimalSeparator = (1.1).toLocaleString().replace(/1/g, '');

    return parseFloat(stringNumber.replace(/^\D*/, '').replace(new RegExp('\\' + thousandSeparator, 'g'), '').replace(new RegExp('\\' + decimalSeparator), '.'));
}
