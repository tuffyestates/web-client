import React from 'react';

export default class API extends React.Component {
    render() {
        return (<iframe css={{border: 'none', display: 'block', width: '100%', height: '100%'}} src={`${process.env.API_PATH}/docs`} />);
    }
}
