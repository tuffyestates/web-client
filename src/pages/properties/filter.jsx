import React from 'react';

// import Colors from '../../colors';
import {AutoComplete, Range, SelectEnum} from '../../components';
import US_COUNTIES from '../../assets/data/usCounties.json';

export default class Filter extends React.Component {
    style = {
        input: {
            marginBottom: '1.5em',
            color: '#333'
        }
    };
    render() {
        return (<div {...this.props}>
            <h3 style={{
                    textAlign: 'center'
                }}>Filters</h3>

            <Range min={0} max={100000000} suffix="$" name="price" css={this.style.input} onChange={this.props.onChange}/>
            <Range min={0} max={10000} suffix="SqFt" name="size" css={this.style.input} onChange={this.props.onChange}/>
            <Range min={0} max={1000} suffix="Acres" name="lot" css={this.style.input} onChange={this.props.onChange}/>

            <AutoComplete placeholder="Location" data={US_COUNTIES} name="location" settings={{
                    keys: [
                        'name', 'state'
                    ],
                    threshold: 0.2,
                    distance: 3
                }} css={this.style.input} onChange={this.props.onChange}/>

            <div css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5em'
                }}>
                <h4 css={{
                        margin: '0 1.5em',
                        flex: 1
                    }}>Bedrooms</h4>
                <SelectEnum name="min-bedrooms" select={'left'} css={{
                        color: '#666'
                    }} onChange={this.props.onChange}>
                    <option value={1} defaultChecked={true}>1 +</option>
                    <option value={2}>2 +</option>
                    <option value={3}>3 +</option>
                    <option value={4}>4 +</option>
                </SelectEnum>
            </div>

            <div css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5em'
                }}>
                <h4 css={{
                        margin: '0 1.5em',
                        flex: 1
                    }}>Bathrooms</h4>
                <SelectEnum name="min-bathrooms" css={{
                        color: '#666'
                    }} onChange={this.props.onChange}>
                    <option value={1} defaultChecked={true}>1 +</option>
                    <option value={2}>2 +</option>
                    <option value={3}>3 +</option>
                    <option value={4}>4 +</option>
                </SelectEnum>
            </div>

        </div>);
    }
}
