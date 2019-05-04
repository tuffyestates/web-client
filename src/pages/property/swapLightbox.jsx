import React from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExchangeAlt} from '@fortawesome/free-solid-svg-icons';

import api from '../../api';
import Colors from '../../colors';
import {Lightbox, Form} from '../../components';
import {ImageGrid} from '../../components';
import {Primary} from '../../components/button';
import Header from './header';
import {Features, Specifications, Map} from './details';
import PropertyCard from '../properties/property';

export default class Swap extends React.Component {
  state = {
    properties: [],
    selectedPropertyIdx: 0
  };
  style = {
    label: {
      color: '#444',
      marginBottom: '1em',
      display: 'block'
    }
  }
  async componentDidMount() {
    this.setState({properties: await this.loadProperties()});
  }
  async loadProperties() {
    try {
        const response = await api.get(`/users/listings`);
        return response.data;
    } catch (e) {
        console.error(e);
        return [];
    }
  }
  render() {
    const {property, onSubmit, onRequestClose, ...props} = this.props;

    const myProperties = this.state.properties.map((property, idx) => (<option key={property.address} value={idx}>{property.address}</option>));
    const selectedProperty = this.state.properties[this.state.selectedPropertyIdx] || {};

    return (<Lightbox {...props} onRequestClose={onRequestClose}>
      <form css={{backgroundColor: 'white', minWidth: '50vw'}} onSubmit={onSubmit}>
        <h2 css={{textAlign: 'center', backgroundColor: Colors.orange, color: 'white', margin: '0 0 1em', padding: '1em'}}>Swap your home</h2>

        <div css={{margin: '2em'}}>
          <label css={this.style.label}>Your Home
            <select css={{display: 'block'}} onChange={e => this.setState({selectedPropertyIdx: e.target.value})} value={this.state.selectedPropertyIdx}>
              {myProperties}
            </select>
          </label>
        </div>

        <div css={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2em'}}>
            <PropertyCard address={selectedProperty.address} price={selectedProperty.price} id={selectedProperty._id} />
          <FontAwesomeIcon icon={faExchangeAlt} css={{fontSize: '5em'}} />
            <PropertyCard address={property.address} price={property.price} id={property._id} />
        </div>

        <div css={{margin: '2em'}}>
          <label css={this.style.label}>Cash
            <Form.Input placeholder="15,000" name="cash" type="number" />
          </label>
          <label css={this.style.label}>Message
            <Form.Textarea placeholder="Additional information..." name="comments" />
          </label>
        </div>

        <div css={{display: 'flex', justifyContent: 'stretch'}}>
          <Primary type="button" css={{backgroundColor: 'grey', width: '100%'}} onClick={onRequestClose}>Cancel</Primary>
          <Primary type="submit" disabled={property.owner === selectedProperty.owner} css={{width: '100%'}} onClick={onRequestClose}>Submit Offer</Primary>
        </div>
        {property.owner === selectedProperty.owner ? <div css={{padding: '1em', color: 'white', backgroundColor: Colors.red}}>You can not trade properties that have the same owner.</div> : null}

        <input hidden name="homeId" value={selectedProperty._id} />
      </form>
    </Lightbox>);
  }
}
