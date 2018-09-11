import React from 'react';
import Colors from '../colors';

export default class Footer extends React.Component {
    render() {
        return (<div style={{
                display: 'flex',
                backgroundColor: Colors.darkblue,
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
