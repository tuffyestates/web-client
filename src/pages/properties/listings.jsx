import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import queryString from 'query-string';

// import Colors from '../../colors';
import api from '../../api';
import {InfiniteScroll} from '../../components';
import Property from './property';

export default class Listings extends React.Component {
    state = {
        infiniteScrollKey: Math.random()
    };
    static getDerivedStateFromProps(props, state) {
        // This will cause the infinite scroll to reload
        return {infiniteScrollKey: Math.random()};
    }

    async loadHomes(offset) {
        const listings = await this.loadData(offset);
        return listings.reduce((arr, house, idx) => {
            arr.push(<Property key={offset + idx} address={house.address} price={house.price} id={house._id}/>)
            return arr;
        }, []);
    }

    async loadData(offset) {
        const options = {
            offset,
            ...this.props.filters,
        };
        try {
            const response = await api.get(`/properties?${queryString.stringify(options)}`);
            return response.data;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    render() {
        return <InfiniteScroll key={this.state.infiniteScrollKey} css={{
                display: 'flex',
                flexWrap: 'wrap',
                flex: 1,
                alignContent: 'flex-start',
                justifyContent: 'center',
                padding: '1em',
                overflowY: 'auto',
            }} loadMore={this.loadHomes.bind(this)}/>;
    }
}
