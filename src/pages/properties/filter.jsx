import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';

import Colors from '../../colors';
import {AutoComplete, Range, SelectEnum} from '../../components';
import US_COUNTIES from '../../assets/data/usCounties.json';

export default class Filter extends React.Component {
    style = {
        input: {
            marginBottom: '1.5em',
            color: '#333'
        }
    };
    render() {
        return (<div {...this.props}>
            <h3 style={{
                    textAlign: 'center'
                }}>Filters</h3>

            <Range min={0} max={100000000} suffix="$" css={this.style.input}/>
            <Range min={0} max={10000} suffix="SqFt" css={this.style.input}/>
            <Range min={0} max={1000} suffix="Acres" css={this.style.input}/>

            <AutoComplete placeholder="Location" data={US_COUNTIES} settings={{
                    keys: [
                        'name', 'state'
                    ],
                    threshold: 0.2,
                    distance: 3
                }} css={this.style.input}/>

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