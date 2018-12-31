import React from 'react';
import queryString from 'query-string';

// import Colors from '../../colors';
import api from '../../api';
import {InfiniteScroll} from '../../components';
import Property from './property';

export default class Listings extends React.Component {
    state = {
        listingsOffset: 0,
        listings: []
    };

    async loadHomes() {
        const data = await this.loadData(this.state.listingsOffset);
        const newListings = data.reduce((arr, house, idx) => {
            arr.push(<Property key={this.state.listingsOffset + idx} address={house.address} price={house.price} id={house._id}/>)
            return arr;
        }, []);
        this.setState({listingsOffset: this.state.listingsOffset + newListings, listings: this.state.listings.concat(newListings)})
    }

    async loadData() {
        const options = {
            offset: this.state.listingsOffset,
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
        return <InfiniteScroll.default css={{
                display: 'flex',
                flexWrap: 'wrap',
                flex: 1,
                alignContent: 'flex-start',
                justifyContent: 'center',
                padding: '1em',
                overflowY: 'auto',
            }} loadMore={this.loadHomes.bind(this)}>
            {this.state.listings}
        </InfiniteScroll.default>;
    }
}
