import React from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes, faSpinner, faCheck} from '@fortawesome/free-solid-svg-icons';

import Colors from '../../colors';
import {Editable, LoadingAnimation, Lightbox, Form} from '../../components';
import {ImageGrid} from '../../components';
import {Primary} from '../../components/button';
import Header from './header';
import {Features, Specifications, Map} from './details';

export default class Property extends React.Component {

    state = {
        swapModalVisible: false,
        property: {
            _id: '',
            address: '',
            price: '',
            specification: {
                built: '',
                size: '',
                lot: '',
                bathrooms: '',
                bedrooms: ''
            },
            location: {
                lat: '',
                lng: ''
            },
            features: {}
        }
    }
    style = {
        header: {
            borderBottom: `1.5px solid ${Colors.lightOrange}`,
            fontWeight: 300
        }
    };
    static getDerivedStateFromProps(props, state) {
        return {
            property: merge(state.property, props.property)
        };
    }

    render() {
        const editable = this.props.mode === 'edit' || this.props.mode === 'create';
        // Loading animation
        if (this.state.property._id === '' && this.props.mode !== 'create') {
            return (<div css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    height: '100%'
                }}><LoadingAnimation/></div>);
        }

        return (<React.Fragment>
            <Header editable={editable} onChange={this.props.onChange} previewImage={this.props.previewImage} property={this.state.property}/>
            <div css={{
                    display: 'grid',
                    maxWidth: 1080,
                    boxSizing: 'border-box',
                    padding: '1em',
                    gridColumnGap: '2em',
                    gridTemplateColumns: 'calc(66.6666% - 1em) calc(33.3333% - 1em)',
                    margin: '0 auto',
                    border: '1px solid #eee',
                    fontFamily: 'Roboto',
                    fontWeight: 300,
                    backgroundColor: '#fcfcfc'
                }}>
                <div css={{
                        gridRowStart: 1,
                        gridRowEnd: 'span 4'
                    }}>
                    <div>
                        <h3 css={this.style.header}>Description</h3>

                        <Editable.Textarea name="description" required={true} editable={editable} onChange={this.props.onChange} css={{
                                width: '100%'
                            }} value={this.state.property.description} placeholder="Description" textareaStyle={{
                                paddingLeft: 0,
                                paddingRight: 0
                            }}/>
                    </div>
                </div>
                <div>
                    <h3 css={this.style.header}>Specifications</h3>
                    <Specifications editable={editable} property={this.state.property} onChange={this.props.onChange}/>
                </div>
                <div>
                    <h3 css={this.style.header}>Map</h3>
                    <Map position={[this.state.property.location.lat, this.state.property.location.lng]}/>
                    <Primary css={{width: '100%', marginTop: '1em'}} onClick={() => this.setState({swapModalVisible: !this.state.swapModalVisible})}>Swap</Primary>
                </div>
            </div>
            <Lightbox open={this.state.swapModalVisible} onRequestClose={() => this.setState({swapModalVisible: false})}>
              <form css={{backgroundColor: 'white', padding: '2em', minWidth: '50vw'}} onSubmit={this.submitSwapRequest}>
                <h2>Swap your home</h2>
                <select>
                  <option>$100 - 123 Fake Address St., Fullerton, California</option>
                </select>
                <h3>for</h3>
                <h4><span css={{color: '#333'}}>${this.state.property.price}</span> - {this.state.property.address}</h4>
                <div css={{display: 'flex', justifyContent: 'space-between'}}>
                  <Primary type="button" css={{backgroundColor: 'grey'}} onClick={() => this.setState({swapModalVisible: false})}>Cancel</Primary>
                  <Primary type="submit" onClick={() => this.setState({swapModalVisible: false})}>Submit Offer</Primary>
                </div>
              </form>
            </Lightbox>
        </React.Fragment>);
    }
    static propTypes = {
        /**
         * Define if the content should be editable
         */
        mode: PropTypes.oneOf(['edit', 'view', 'create']).isRequired,
        /**
         * Data about the property
         */
        property: PropTypes.object.isRequired,
        /**
         * Handle input change events
         */
        onChange: PropTypes.func
    };
}
