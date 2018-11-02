import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {RedocStandalone} from 'redoc';

// NOTE: As of swagger-ui 3.19.4, react 16 is not supported resulting in multiple
// issues, namely inputs being reset before submitting a form. See
// https://github.com/swagger-api/swagger-ui/labels/epic%3A%20usage%20in%20react%4016
// for more info.
export default class API extends React.Component {
    render() {
        return (<RedocStandalone specUrl={process.env.API_PATH}/>);
    }
}
