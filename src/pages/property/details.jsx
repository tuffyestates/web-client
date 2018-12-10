import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHammer, faExpand, faCompress, faVectorSquare, faBed, faBath} from '@fortawesome/free-solid-svg-icons';
import {Map as Leaflet, TileLayer, Marker} from 'react-leaflet';
import leaflet from 'leaflet';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import Fullscreen from "react-full-screen";

import {Editable, Form, SelectEnum} from '../../components';
import 'leaflet/dist/leaflet.css';

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
                    flex: 1,
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
            <Entry value={this.props.property.specification.bedrooms} icon={faBed} name="specification.bedrooms" placeholder="bedrooms" editable={this.props.editable} onChange={this.props.onChange}/>
            <Entry value={this.props.property.specification.bathrooms} icon={faBath} name="specification.bathrooms" placeholder="bathrooms" editable={this.props.editable} onChange={this.props.onChange}/>
        </div>);
    }
}

export class Map extends React.PureComponent {
    state = {
        isFullScreen: false
    };
    render() {
        const center = this.props.position || [0, 0,];
        return (<Fullscreen enabled={this.state.isFullScreen} onChange={isFullScreen => this.setState({isFullScreen})}>
            <Leaflet css={{
                    '.leaflet-marker-icon' : {
                        filter: 'drop-shadow(rgba(0, 0, 0, 0.45) 0.3em 0.9em 0.7em)'
                    }
                }} center={center} zoom={14} style={{
                    height: this.state.isFullScreen ? "100%" : 400
                }}>
                <a css={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                        backgroundColor: 'white',
                        zIndex: 800,
                        padding: '0.6em',
                        fontSize: '1.2em',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        border: "2px solid rgba(0,0,0,0.2)",
                        color: 'black !important'
                    }} onClick={() => this.setState({isFullScreen: !this.state.isFullScreen})}><FontAwesomeIcon style={{
                float: 'left'
            }} icon={this.state.isFullScreen ? faCompress : faExpand} title={this.state.isFullScreen ? "Exit Fullscreen" : "Fullscreen"}/></a>
                <TileLayer attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>' url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`} subdomains="abc" maxZoom={19}/>
                <Marker icon={leafletIcon} position={center}/>
            </Leaflet>
        </Fullscreen>);
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

const leafletIcon = leaflet.icon({
    iconUrl: "data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 365 560' enable-background='new 0 0 365 560' xml:space='preserve'%3E%3Cg%3E%3Cpath fill='%2300AEEF' d='M182.9,551.7c0,0.1,0.2,0.3,0.2,0.3S358.3,283,358.3,194.6c0-130.1-88.8-186.7-175.4-186.9 C96.3,7.9,7.5,64.5,7.5,194.6c0,88.4,175.3,357.4,175.3,357.4S182.9,551.7,182.9,551.7z M122.2,187.2c0-33.6,27.2-60.8,60.8-60.8 c33.6,0,60.8,27.2,60.8,60.8S216.5,248,182.9,248C149.4,248,122.2,220.8,122.2,187.2z'/%3E%3C/g%3E%3C/svg%3E",
    iconSize: [
        38, 43,
    ],
    iconAnchor: [
        19, 43,
    ],
    popupAnchor: [
        -3, -76,
    ],
});
