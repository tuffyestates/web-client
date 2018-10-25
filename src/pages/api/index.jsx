import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';

// NOTE: As of swagger-ui 3.19.4, react 16 is not supported resulting in multiple
// issues, namely inputs being reset before submitting a form. See
// https://github.com/swagger-api/swagger-ui/labels/epic%3A%20usage%20in%20react%4016
// for more info.
export default class API extends React.Component {
    constructor(props) {
        super(props);
        this.frame = React.createRef();
    }
    componentDidMount() {
        console.debug("Loading api schema from:", process.env.API_PATH);
        const page = `
<html>
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.19.4/swagger-ui-bundle.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.19.4/swagger-ui-standalone-preset.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.19.4/swagger-ui.css">
</head>
<body>
    <div id="ui"></div>
    <script>
        window.onload = function() {
            const ui = SwaggerUIBundle({
                url: "${process.env.API_PATH}",
                dom_id: '#ui',
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
            });
            window.ui = ui;
        }
    </script>
</body>
</html>`;
        const frame = this.frame.current;

        const ifrmDoc = frame.contentWindow.document;
        ifrmDoc.open();
        ifrmDoc.write(page);
        ifrmDoc.close();
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (<iframe css={{width: '100%', height: '100%', border: 'none', display: 'block'}} ref={this.frame}/>);
    }
}
