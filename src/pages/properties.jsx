import React from 'react';
import Colors from '../colors';
import {Link} from 'react-router-dom';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import queryString from 'query-string';

import api from '../api';
import {FallbackImage, AutoComplete, Range, SelectEnum, InfiniteScroll} from '../components';

class Listings extends React.PureComponent {
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

class Property extends React.PureComponent {
    priceFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
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
            }} to={{
                pathname: `/properties/${this.props.id}`
            }} {...this.props}>

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
                        padding: `0.6em 0.5em`,
                        color: 'white',
                        textShadow: '1px 1px 1px black'
                    }}>{this.props.address}</div>
            </div>

            <div css={{
                    padding: '0.5em'
                }} className={this.props.className}>
                <span>{this.priceFormatter.format(this.props.details.price)}</span>
            </div>
        </Link>);
    }
    static defaultProps = {
        address: '',
        details: {}
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

            <AutoComplete placeholder="Location" data={require('../assets/data/usCounties.json')} settings={{
                    keys: [
                        'name', 'state'
                    ],
                    threshold: 0.2,
                    distance: 3
                }} css={{
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
    render() {
        console.log(this.state)
        return (<div css={{
                display: 'flex',
                justifyContent: 'flex-stretch',
                height: '100%',
            }}>
            <Filter onChange={(filters) => this.setState({filters})}/>
            <div css={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <Listings css={{
                        flex: 1
                    }} filters={this.filters}/>
            </div>
        </div>);
    }
}
