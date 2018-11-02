import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';

import Listings from './listings';
import Filter from './filter';

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
