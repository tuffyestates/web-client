import React from 'react';
import PropTypes from 'prop-types';

import Colors from '../colors';

export default class Grid extends React.PureComponent {
    render() {
        const children = this.props.srcs.map(src => {
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
        srcs: PropTypes.array
    };
    static defaultProps = {
        srcs: []
    };
    static docProps = {
        children: "Hello!"
    };
}
