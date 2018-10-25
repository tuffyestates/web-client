import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

export default class FourOFour extends React.Component {

    render() {
        return (<div css={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: '#ffffffe6',
                backgroundBlendMode: 'overlay',
                backgroundImage: `url(${require('../images/missing-house.svg')})`,
                backgroundSize: 'auto 90%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100%',
                color: '#333'
            }}>
            <h1 css={{fontSize: '12em', margin: '0.05em 0', lineHeight: '0.9em'}}>404</h1>
            <h2 css={{margin: 0}}>page not found</h2>
        </div>);
    }
}