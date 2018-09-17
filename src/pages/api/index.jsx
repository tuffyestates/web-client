import React from 'react';
import SwaggerUI from 'swagger-ui';
require('./theme-flattop.css');

export default class API extends React.PureComponent {
    componentDidMount() {
        console.debug("Loading api schema from:", process.env.API_PATH);
        SwaggerUI({dom_id: "#ui", url: process.env.API_PATH});
    }
    render() {
        return (<div id="ui"/>);
    }
}
