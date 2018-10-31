import React from 'react';
import Colors from '../colors';
import {Link} from 'react-router-dom';
/** @jsx jsx */
import {jsx} from '@emotion/core';

import {FallbackImage, Input, AutoComplete, Range, SelectEnum, InfiniteScroll} from '../components';

const HOME_DETAILS_PADDING = '0.5em';

class Listings extends React.PureComponent {
    async loadHomes(offset) {
        const limit = 10;
        const listings = this.props.listings.slice(offset, offset + limit);
        return listings.reduce((arr, house, idx) => {
            arr.push(<Home key={offset + idx} street={house.address} price={house.price} id={house.id}/>)
            return arr;
        }, []);
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
            }} onLoad={this.loadHomes.bind(this)}/>);
    }
}
class HomeDetails extends React.PureComponent {
    priceFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    render() {
        return (<div css={{
                padding: HOME_DETAILS_PADDING
            }} {...this.props}>
            <span>{this.priceFormatter.format(this.props.price)}</span>
        </div>);
    }
}
class Home extends React.PureComponent {
    render() {
        return (<Link css={{
                boxShadow: '0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)',
                margin: '1em',
                flex: 1,
                minWidth: 400,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s',
                '&:hover' : {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)'
                }
            }} to={`/properties/123456789`} {...this.props}>

            {/* Image Container */}
            <div css={{
                    position: 'relative'
                }}>
                <FallbackImage src={`${process.env.STATIC_PATH}/property/image/${this.props.id}.jpg`} css={{
                        objectFit: 'cover',
                        width: '100%',
                        height: 250,
                        display: 'block'
                    }}/> {/* Street Address */}
                <div css={{
                        position: 'absolute',
                        bottom: 0,
                        padding: `0.6em ${HOME_DETAILS_PADDING}`,
                        color: 'white',
                        textShadow: '1px 1px 1px black'
                    }}>{this.props.street}</div>
            </div>

            <HomeDetails price={this.props.price}/>
        </Link>);
    }
}
class Filter extends React.Component {
    render() {
        return (<div css={{

                fontFamily: 'cabin',
                fontWeight: '200',

                margin: '20px 0 0 0',
                // borderRadius: '5px',
                backgroundColor: Colors.blue,
                color: 'white',
                width: 400,
                padding: '1em 2em',
                overflow: 'auto'
            }} {...this.props}>
            <h3 style={{
                    textAlign: 'center'
                }}>Filters</h3>

            <Range min={0} max={100000000} suffix="$" css={{
                    marginBottom: '1.5em'
                }}/>
            <Range min={0} max={10000} suffix="SqFt" css={{
                    marginBottom: '1.5em'
                }}/>
            <Range min={0} max={1000} suffix="Acres" css={{
                    marginBottom: '1.5em'
                }}/>

            <AutoComplete placeholder="Location" data={require('../assets/data/usCounties.json')} settings={{keys: ['name', 'state']}} css={{
                    width: '100%',
                    marginBottom: '1.5em'
                }}/>

            <div css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5em'
                }}>
                <h4 css={{
                        margin: '0 1.5em',
                        flex: 1
                    }}>Bedrooms</h4>
                <SelectEnum name="bedrooms" select={'left'} css={{
                        color: '#666'
                    }}>
                    <option value={1} defaultChecked={true}>1 +</option>
                    <option value={2}>2 +</option>
                    <option value={3}>3 +</option>
                    <option value={4}>4 +</option>
                </SelectEnum>
            </div>

            <div css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5em'
                }}>
                <h4 css={{
                        margin: '0 1.5em',
                        flex: 1
                    }}>Bathrooms</h4>
                <SelectEnum name="bathrooms" css={{
                        color: '#666'
                    }}>
                    <option value={1} defaultChecked={true}>1 +</option>
                    <option value={2}>2 +</option>
                    <option value={3}>3 +</option>
                    <option value={4}>4 +</option>
                </SelectEnum>
            </div>

            {/* <div className="filters features">
                    <span

                      style={{

                        fontSize: '13.5px',
                        fontWeight: '400',
                        display: 'block',
                        marginBottom: '16px',
                        marginTop: '10px',

                    }} {...this.props}

                       className="title">Features</span>
                    <label htmlFor="features">
                        <span

                          style={{

                            fontSize: '13px',
                            fontWeight: '200',
                            display: 'block',
                            marginBottom: '16px',
                            marginTop: '10px'
                        }} {...this.props} className="title">Features</span>

                    <label htmlFor="features">

                        <span style={{
                                fontSize: '13px',
                                fontWeight: '200',
                                display: 'block',
                                width: '30%',
                                padding: '10px 0'
                            }} {...this.props}>Garage</span>

                        <input style={{
                                fontSize: '13px',
                                fontWeight: '200',
                                display: 'block',
                                width: '30%',
                                padding: '10px 0',
                                float: 'right'
                            }} {...this.props} name="Garage" value="Garage" type="checkbox"/>

                    </label>

                    <label htmlFor="features">
                        <span>Swimming Pool</span>
                        <input name="Swimming_Pool" value="Swimming_Pool" type="checkbox"/>
                    </label>
                    <label htmlFor="features">
                        <span>Fireplace</span>
                        <input name="Fireplace" value="Fireplace" type="checkbox"/>
                    </label>
                    <label htmlFor="features">
                        <span>Guest House</span>
                        <input name="Guest_House" value="Guest_House" type="checkbox"/>
                    </label>
                </div> */
            }

        </div>);
    }
}

export default class Container extends React.PureComponent {
    state = {
        filters: {}
    }
    filter(data) {
        // TODO: use this.state.filters to filter data
        return data;
    }
    render() {
        const filteredData = this.filter(DATA.concat(DATA).concat(DATA).concat(DATA));
        return (<div css={{
                display: 'flex',
                justifyContent: 'flex-stretch',
                height: '100%'
            }}>
            <Filter filters={this.state.filters}/>
            <div css={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <Listings css={{
                        flex: 1
                    }} listings={filteredData}/>
            </div>
        </div>);
    }
}

const DATA = [
    {
        id: 1,
        homeType: 'Houses',
        address: '6231 Hacienda Pl',
        city: 'Hollywood',
        state: 'CA',
        bedroom: 4,
        bathroom: 3,
        price: 850000,
        squareFeet: 3115,
        lotSize: 4312,
        // features: [
        //   'Garage',
        //   'Swimming Pool',
        //   'Fireplace'
        // ],
        Garage: true,
        Swimming_Pool: true,
        Fireplace: true,
        Guest_House: false,
        image: './img/house_1.jpg'
    }, {
        id: 2,
        homeType: 'Condos',
        address: '511 Clark Way',
        city: 'Malibu',
        state: 'CA',
        bedroom: 3,
        bathroom: 2,
        price: 720000,
        squareFeet: 2785,
        lotSize: 4115,
        // features: [
        //   'Garage',
        //   'Fireplace',
        // ],
        Garage: true,
        Swimming_Pool: false,
        Fireplace: true,
        Guest_House: false,
        image: './img/house_2.jpg'
    }, {
        id: 3,
        homeType: 'Townhomes',
        address: '745 Granada Ave',
        city: 'Brentwood',
        state: 'CA',
        bedroom: 3,
        bathroom: 3,
        price: 785000,
        squareFeet: 2825,
        lotSize: 3824,
        // features: [
        //   'Garage',
        //   'Swimming Pool'
        // ],
        Garage: true,
        Swimming_Pool: true,
        Fireplace: false,
        Guest_House: false,
        image: './img/house_3.jpg'
    }, {
        id: 4,
        homeType: 'Houses',
        address: '2113 Park Pl',
        city: 'Hollywood',
        state: 'CA',
        bedroom: 4,
        bathroom: 4,
        price: 885000,
        squareFeet: 3815,
        lotSize: 4798,
        // features: [
        //   'Garage',
        //   'Swimming Pool',
        //   'Fireplace'
        // ],
        Garage: true,
        Swimming_Pool: true,
        Fireplace: true,
        Guest_House: false,
        image: './img/house_4.jpg'
    }, {
        id: 5,
        homeType: 'Condos',
        address: '638 Hollints Ct',
        city: 'Downey',
        state: 'CA',
        bedroom: 2,
        bathroom: 2,
        price: 620000,
        squareFeet: 2815,
        lotSize: 4035,
        // features: [
        //   'Garage',
        //   'Fireplace'
        // ],
        Garage: true,
        Swimming_Pool: false,
        Fireplace: true,
        Guest_House: false,
        image: './img/house_5.jpg'
    }, {
        id: 6,
        homeType: 'Houses',
        address: '854 Summit Dr',
        city: 'Beverly Hills',
        state: 'CA',
        bedroom: 4,
        bathroom: 3,
        price: 970000,
        squareFeet: 4316,
        lotSize: 6295,
        // features: [
        //   'Garage',
        //   'Swimming Pool',
        //   'Fireplace',
        //   'Guest House'
        // ],
        Garage: true,
        Swimming_Pool: true,
        Fireplace: true,
        Guest_House: true,
        image: './img/house_6.jpg'
    }
];
