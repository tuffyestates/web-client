import React from 'react';

export default class API extends React.PureComponent {
    async componentDidMount() {
        console.debug("Loading api schema from:", process.env.API_PATH);

        // Load API theme
        import (/* webpackChunkName: "api" */
        './theme/main.scss');

        // Load API ui
        const SwaggerUI = (await import (/* webpackChunkName: "api" */
        'swagger-ui')).default;

        SwaggerUI({dom_id: "#ui", url: process.env.API_PATH});
    }
    render() {
        return (<div id="ui"/>);
    }
}
