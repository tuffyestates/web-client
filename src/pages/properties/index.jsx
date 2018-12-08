import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Link} from 'react-router-dom';
import set from 'lodash.set';

import {debounce} from '../../utils';
import {Primary} from '../../components/button';
import Colors from '../../colors';
import Listings from './listings';
import Filter from './filter';

export default class Container extends React.PureComponent {
    state = {
        filters: {}
    }
    onFilterChange = debounce((e) => {
        let filters = Object.assign({}, this.state.filters);
        let value = e.target.value || e.target.files;
        if (value === '' || value === null)
            value = undefined;
        set(filters, e.target.name, value);
        this.setState({filters});
    }, 400);
    render() {
        return (<div css={{
                display: 'flex',
                justifyContent: 'flex-stretch',
                height: '100%',
            }}>
            <div css={{
                    width: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'stretch',
                }}>
                <Link to="/properties/create">
                    <Primary css={{
                            width: '100%'
                        }}>Post a Listing</Primary>
                </Link>
                <Filter css={{
                        fontFamily: 'cabin',
                        fontWeight: '200',
                        backgroundColor: Colors.blue,
                        color: 'white',
                        flex: 1,
                        padding: '1em 2em',
                        overflow: 'auto',
                        boxSizing: 'border-box',
                    }} onChange={(e) => {
                        e.persist();
                        this.onFilterChange(e);
                    }}/>
            </div>
            <div css={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <Listings css={{
                        flex: 1
                    }} filters={this.state.filters}/>
            </div>
        </div>);
    }
}
