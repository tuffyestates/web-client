import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHammer, faExpand, faVectorSquare} from '@fortawesome/free-solid-svg-icons';
/** @jsx jsx */
import {jsx} from '@emotion/core';

import {Editable, Form, SelectEnum} from '../../components';

class Select extends React.PureComponent {
    render() {
        return (<SelectEnum name={this.props.name} css={{
                color: '#666'
            }}>
            <option value={1} defaultChecked={true}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5 +</option>
        </SelectEnum>);
    }
}

class Entry extends React.PureComponent {
    render() {
        return (<div css={{
                minWidth: 100,
                width: '50%',
                display: 'flex',
                alignItems: 'center'
            }}>
            <FontAwesomeIcon style={{
                    padding: '0 0.5em',
                    width: 20
                }} icon={this.props.icon}/>
            <Editable.Input required={true} value={this.props.value} name={this.props.name} suffix={this.props.suffix} suffixStyle={{
                    backgroundColor: 'transparent',
                    border: 'none'
                }} onChange={this.props.onChange} editableLineColor="#bbb" css={{
                    flex:1,
                    margin: '0 0.4em'
                }} editable={this.props.editable} placeholder={this.props.placeholder}/>
        </div>);
    }
}

export class Specifications extends React.PureComponent {
    render() {
        return (<div css={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: '100%'
            }}>
            <Entry value={this.props.property.specification.built} icon={faHammer} name="specification.built" placeholder="Year Built" editable={this.props.editable} onChange={this.props.onChange}/>
            <Entry value={this.props.property.specification.size} icon={faExpand} name="specification.size" placeholder="Square Feet" editable={this.props.editable} onChange={this.props.onChange}/>
            <Entry value={this.props.property.specification.lot} icon={faVectorSquare} name="specification.lot" placeholder="Acres" editable={this.props.editable} onChange={this.props.onChange}/>
            <Entry value={this.props.property.specification.bedrooms} icon={faVectorSquare} name="specification.bedrooms" placeholder="bedrooms" editable={this.props.editable} onChange={this.props.onChange}/>
            <Entry value={this.props.property.specification.bathrooms} icon={faVectorSquare} name="specification.bathrooms" placeholder="bathrooms" editable={this.props.editable} onChange={this.props.onChange}/>
        </div>);
    }
}
export class Features extends React.PureComponent {
    state = {};
    static getDerivedStateFromProps(props, state) {
        let features = Object.keys(props.property.features).map(key => {
            return <Form.Checkbox key={key}>key</Form.Checkbox>
        });
        return {features};
    }
    render() {
        return (<div css={{
                display: 'flex'
            }}>
            {this.state.features}
        </div>);
    }
}
