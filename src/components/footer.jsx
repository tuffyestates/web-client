import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (<div style={{
                display: 'flex',
                backgroundColor: 'blue',
                position: 'sticky',
                bottom: 0
            }}>
            Footer
        </div>);
    }
}
