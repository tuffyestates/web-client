import React from 'react';

export default class FallbackImage extends React.PureComponent {
    render() {
        return (<img onError={e => e.target.src=require('../images/placeholder.svg')} {...this.props}/>);
    }
}
