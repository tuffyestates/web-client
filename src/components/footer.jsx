import React from 'react';
import Colors from '../colors';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export default class Footer extends React.PureComponent {
    render() {
        return (<div css={{
                display: 'flex',
                backgroundColor: Colors.blue,
                opacity: '0.9',

                color: 'white',
                padding: '0.5em',
                justifyContent: 'space-between',
                fontSize: '0.8em'
                // position: 'sticky',
                // bottom: 0
            }}>
            <div>Tuffy Estates | All Rights Reserved</div>
            <div>CPSC 362 | 2018</div>
        </div>);
    }
}
