import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {RedocStandalone} from 'redoc';

export default class API extends React.Component {
    render() {
        return (<RedocStandalone specUrl={process.env.API_PATH}/>);
    }
}
