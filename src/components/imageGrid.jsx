import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';

import Colors from '../colors';

export default class Grid extends React.PureComponent {
    render() {
        const children = this.props.srcs.reduce(src => {
            if (src.endsWith('.mp4')) {
                return (<video key={src} src={src}/>);
            }
            return (<img key={src} src={src}/>);
        });
        return (<div css={{
                display: "flex"
            }}>
            {children}
        </div>);
    }
    static propTypes = {
        srcs: PropTypes.object
    };
    static defaultProps = {};
    static docProps = {
        children: "Hello!"
    };
}
