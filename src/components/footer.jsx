import React from 'react';
import Colors from '../colors';

export default class Footer extends React.PureComponent {
    render() {
        return (<div css={{
                display: 'flex',
                backgroundColor: Colors.blue,
                color: 'white',
                padding: '0.5em',
                justifyContent: 'space-between',
                fontSize: '0.8em'
                // position: 'sticky',
                // bottom: 0
            }}>
            <div>Tuffy Estates | All Rights Reserved</div>
            <div>CPSC 462 | 2018</div>
        </div>);
    }
}
