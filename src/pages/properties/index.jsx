import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Link} from 'react-router-dom';

import {Primary} from '../../components/button';
import Colors from '../../colors';
import Listings from './listings';
import Filter from './filter';

export default class Container extends React.PureComponent {
    state = {
        filters: {}
    }
    render() {
        return (<div css={{
                display: 'flex',
                justifyContent: 'flex-stretch',
                height: '100%'
            }}>
            <div css={{
                    width: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'stretch'
                }}>
                <Link to="/properties/create"><Primary css={{width: '100%'}}>Post a Listing</Primary></Link>
                <Filter css={{
                        fontFamily: 'cabin',
                        fontWeight: '200',
                        backgroundColor: Colors.blue,
                        color: 'white',
                        flex: 1,
                        padding: '1em 2em',
                        overflow: 'auto',
                        boxSizing: 'border-box'
                    }} onChange={(filters) => this.setState({filters})}/>
            </div>
            <div css={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <Listings css={{
                        flex: 1
                    }} filters={this.filters}/>
            </div>
        </div>);
    }
}
