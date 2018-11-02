import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import queryString from 'query-string';

import Colors from '../../colors';
import api from '../../api';
import {InfiniteScroll} from '../../components';
import Property from './property';

export default class Listings extends React.PureComponent {
    async loadHomes(offset) {
        const listings = await this.loadData(offset);
        return listings.reduce((arr, house, idx) => {
            arr.push(<Property key={offset + idx} address={house.address} details={house.details} id={house.id}/>)
            return arr;
        }, []);
    }
    async loadData(offset) {
        const options = {
            limit: 9,
            offset
        };
        try {
            const response = await api.get(`/properties?${queryString.stringify(options)}`);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }
    render() {
        return (<InfiniteScroll css={{
                display: 'flex',
                flexWrap: 'wrap',
                flex: 1,
                alignContent: 'flex-start',
                justifyContent: 'center',
                padding: '1em',
                overflowY: 'auto'
            }} loadMore={this.loadHomes.bind(this)}/>);
    }
}
