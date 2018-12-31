import React from 'react';

export default class FourOFour extends React.Component {

    render() {
        return (<div css={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backgroundBlendMode: 'overlay',
                backgroundImage: `url(${require('../assets/images/missing-house.svg')})`,
                backgroundSize: 'auto 90%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100%',
                color: '#333'
            }}>
            <h1 css={{
                    fontSize: '12em',
                    margin: '0.05em 0',
                    lineHeight: '0.9em'
                }}>404</h1>
            <h2 css={{
                    margin: 0
                }}>page not found</h2>
        </div>);
    }
}
