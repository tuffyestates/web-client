import React from 'react';
import Colors from '../colors';
import {Link} from 'react-router-dom';
import {FallbackImage} from '../components';
/** @jsx jsx */
import {jsx} from '@emotion/core';

const HOME_DETAILS_PADDING = '0.5em';

class InfiniteScroll extends React.PureComponent {
    state = {
        content: [],
        done: false
    };
    constructor(props) {
        super(props);
        this.container = React.createRef();
    }
    async componentDidMount() {
        const content = this.state.content.concat(await this.props.onLoad(this.state.content.length));
        this.setState({content});

        // Listen for scroll events
        this.container.current.addEventListener('scroll', this.handleScroll.bind(this), {passive: true});
    }
    componentWillUnmount() {
        this.container.current.removeEventListener('scroll', this.handleScroll.bind(this), {passive: true});
    }
    async handleScroll(e) {
        // If we have already loaded everything that exists
        if (this.state.done)
            return;

        const container = e.currentTarget;
        if (container.scrollTop + container.clientHeight > container.scrollHeight - this.props.offset) {
            let done = false;

            const newContent = await this.props.onLoad(this.state.content.length);

            // No new content, don't try to load more content again
            if (newContent.length === 0)
                done = true;

            const content = this.state.content.concat(newContent);
            this.setState({
                content,
                done
            }, () => {
                if (done && this.props.onFinish) {
                    this.props.onFinish();
                }
            });
        }
    }
    render() {
        // onWheel={this.handleScroll.bind(this)}
        return (<div {...this.props} ref={this.container}>
            {this.state.content}
            {this.props.children}
        </div>);
    }
}

class Listings extends React.PureComponent {
    async loadHomes(offset) {
        const limit = 10;
        const listings = this.props.listings.slice(offset, offset + limit);
        return listings.reduce((arr, house, idx) => {
            arr.push(<Home key={offset + idx} street={house.address} price={house.price} id={house.id}/>)
            return arr;
        }, []);
    }
    render() {
        return (<InfiniteScroll offset={300} css={{
                display: 'flex',
                flexWrap: 'wrap',
                flex: 1,
                alignContent: 'flex-start',
                justifyContent: 'center',
                padding: '1em',
                overflowY: 'auto'
            }} onLoad={this.loadHomes.bind(this)}/>);
    }
}
class HomeDetails extends React.PureComponent {
    priceFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    render() {
        return (<div css={{
                padding: HOME_DETAILS_PADDING
            }} {...this.props}>
            <span>{this.priceFormatter.format(this.props.price)}</span>
        </div>);
    }
}
class Home extends React.PureComponent {
    render() {
        return (<Link css={{
                boxShadow: '0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)',
                margin: '1em',
                flex: 1,
                minWidth: 400,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s',
                '&:hover' : {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)'
                }
            }} to={`/properties/123456789`} {...this.props}>

            {/* Image Container */}
            <div css={{
                    position: 'relative'
                }}>
                <FallbackImage src={`${process.env.STATIC_PATH}/property/image/${this.props.id}.jpg`} css={{
                        objectFit: 'cover',
                        width: '100%',
                        height: 250,
                        display: 'block'
                    }}/> {/* Street Address */}
                <div css={{
                        position: 'absolute',
                        bottom: 0,
                        padding: `0.6em ${HOME_DETAILS_PADDING}`,
                        color: 'white',
                        textShadow: '1px 1px 1px black'
                    }}>{this.props.street}</div>
            </div>

            <HomeDetails price={this.props.price}/>
        </Link>);
    }
}
class Filter extends React.PureComponent {
    render() {
        return (<div css={{

                fontFamily: 'cabin',
                fontWeight: '200',

                margin: '20px 0 0 0',
                opacity: '0.9',
                // borderRadius: '5px',
                backgroundColor: Colors.blue,
                width: 400,
                color: 'white',
                padding: '1em'
            }} {...this.props}>

            <h4

              style={{

                        marginTop: '0',

                    }} {...this.props}

              >Filter</h4>

            <div style={{

                    height: '25px',
                    background: 'trasparent',
                    padding: '10px',
                    fontSize: '12px',
                    fontWeight: '300',
                    color: '#1B1B1B',
                    display: 'block',
                    marginBottom: '25px',
                    width: '100%'

                }} {...this.props}>

                <select style={{

                        height: '25px',
                        background: 'trasparent',
                        padding: '10px',
                        fontSize: '12px',
                        fontWeight: '300',
                        color: '#1B1B1B',
                        display: 'block',
                        marginBottom: '25px',
                        width: '95%'

                    }} {...this.props} name="city" className="filters city" onChange={this.props.change}>
                    <option value="all">All Cities</option>
                </select>
                <select

                  style={{

                        height: '25px',
                        background: 'trasparent',
                        padding: '10px',
                        fontSize: '12px',
                        fontWeight: '300',
                        color: '#1B1B1B',
                        display: 'block',
                        marginBottom: '25px',
                        width: '95%'

                    }} {...this.props}

                   name="homeType" className="filters homeType" onChange={this.props.change}>
                    <option value="all">All Home Types</option>

                </select>
                <select

                  style={{

                        height: '25px',
                        background: 'trasparent',
                        padding: '10px',
                        fontSize: '12px',
                        fontWeight: '300',
                        color: '#1B1B1B',
                        display: 'block',
                        marginBottom: '25px',
                        width: '95%'

                    }} {...this.props}

                  name="bedroom" className="filters bedroom" onChange={this.props.change}>
                    <option value="0">0+ Bedrooms</option>

                </select>
                <select

                  style={{

                        height: '25px',
                        background: 'trasparent',
                        padding: '10px',
                        fontSize: '12px',
                        fontWeight: '300',
                        color: '#1B1B1B',
                        display: 'block',
                        marginBottom: '25px',
                        width: '95%'

                    }} {...this.props}

                  name="bathroom" className="filters bathroom" onChange={this.props.change}>
                    <option value="0">0+ Bathrooms</option>

                </select>

            </div>

            <div style={{

                    borderRadius: '5px',
                    fontSize: '14px',
                    padding: '5px',
                    width: '100%',
                    display: 'block',
                    marginRight: '2.5%',
                    marginBottom: '16px',

                    marginTop: '150px',
                }} {...this.props}>

                <div className="filters price">
                    <span

                      style={{

                        fontSize: '13.5px',
                        fontWeight: '400',
                        display: 'block',
                        marginBottom: '16px',

                    }} {...this.props}

                       className="title">Price</span>

                    {/* alternate input type to confirm numeric input */}
                    {/* type="number" pattern="[0-9]*" inputmode="numeric" */}

                    <input

                      style={{

                        borderRadius: '5px',
                        fontSize: '14px',
                        padding: '5px',
                        width: '40%',
                        display: 'inline-block',
                        marginRight: '2.5%',
                        marginBottom: '16px',

                    }} {...this.props}


                       type="number" pattern="[0-9]*" inputMode="numeric" min="0" max="1000000" step="100000" name="min_price" className="min-price"/>
                    <input

                      style={{

                        borderRadius: '5px',
                        fontSize: '14px',
                        padding: '5px',
                        width: '40%',
                        display: 'inline-block',
                        marginRight: '2.5%',
                        marginBottom: '16px',

                    }} {...this.props}


                      type="number" pattern="[0-9]*" inputMode="numeric" min="0" max="1000000" step="100000" name="max_price" className="max-price"/>
                </div>

                <div className="filters squareFeet">
                    <span

                      style={{

                        fontSize: '13.5px',
                        fontWeight: '400',
                        display: 'block',
                        marginBottom: '16px',
                        marginTop: '10px',

                    }} {...this.props}

                       className="title">Square Feet</span>
                    <input

                      style={{

                        borderRadius: '5px',
                        fontSize: '14px',
                        padding: '5px',
                        width: '40%',
                        display: 'inline-block',
                        marginRight: '2.5%',
                        marginBottom: '16px',

                    }} {...this.props}

                       type="number" pattern="[0-9]*" inputMode="numeric" min="0" max="10000" step="100" name="min_squareFeet" className="min-squareFeet"/>
                    <input


                      style={{

                        borderRadius: '5px',
                        fontSize: '14px',
                        padding: '5px',
                        width: '40%',
                        display: 'inline-block',
                        marginRight: '2.5%',
                        marginBottom: '16px',

                    }} {...this.props}

                       type="number" pattern="[0-9]*" inputMode="numeric" min="0" max="10000" step="100" name="max_squareFeet" className="max-squareFeet"/>
                </div>
                <div className="filters lotSize">
                    <span

                      style={{

                        fontSize: '13.5px',
                        fontWeight: '400',
                        display: 'block',
                        marginBottom: '16px',
                        marginTop: '10px',

                    }} {...this.props}

                      className="title">Lot Size</span>
                    <input


                      style={{

                        borderRadius: '5px',
                        fontSize: '14px',
                        padding: '5px',
                        width: '40%',
                        display: 'inline-block',
                        marginRight: '2.5%',
                        marginBottom: '16px',

                    }} {...this.props}

                       type="number" pattern="[0-9]*" inputMode="numeric" min="0" max="50000" step="1000" name="min_lotSize" className="min-lotSize"/>
                    <input


                      style={{

                        borderRadius: '5px',
                        fontSize: '14px',
                        padding: '5px',
                        width: '40%',
                        display: 'inline-block',
                        marginRight: '2.5%',
                        marginBottom: '16px',

                    }} {...this.props}

                       type="number" pattern="[0-9]*" inputMode="numeric" min="0" max="50000" step="1000" name="max_lotSize" className="max-lotSize"/>
                </div>
                <div className="filters features">
                    <span

                      style={{

                        fontSize: '13.5px',
                        fontWeight: '400',
                        display: 'block',
                        marginBottom: '16px',
                        marginTop: '10px',

                    }} {...this.props}

                       className="title">Features</span>
                    <label htmlFor="features">
                        <span

                          style={{

                            fontSize: '13px',
                            fontWeight: '200',
                            display: 'block',
                            width: '30%',
                            padding: '10px 0',

                    }} {...this.props}

                          >Garage</span>
                        <input

                          style={{

                            fontSize: '13px',
                            fontWeight: '200',
                            display: 'block',
                            width: '30%',
                            padding: '10px 0',
                            float: 'right',

                    }} {...this.props}

                          name="Garage" value="Garage" type="checkbox"/>
                    </label>
                    <label htmlFor="features">
                        <span>Swimming Pool</span>
                        <input name="Swimming_Pool" value="Swimming_Pool" type="checkbox"/>
                    </label>
                    <label htmlFor="features">
                        <span>Fireplace</span>
                        <input name="Fireplace" value="Fireplace" type="checkbox"/>
                    </label>
                    <label htmlFor="features">
                        <span>Guest House</span>
                        <input name="Guest_House" value="Guest_House" type="checkbox"/>
                    </label>
                </div>

            </div>

        </div>);
    }
}

export default class Container extends React.PureComponent {
    state = {
        filters: {}
    }
    filter(data) {
        // TODO: use this.state.filters to filter data
        return data;
    }
    render() {
        const filteredData = this.filter(DATA.concat(DATA).concat(DATA).concat(DATA));
        return (<div css={{
                display: 'flex',
                justifyContent: 'flex-stretch',
                height: '100%'
            }}>
            <Filter filters={this.state.filters}/>
            <div css={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <Listings css={{
                        flex: 1
                    }} listings={filteredData}/>
            </div>
        </div>);
    }
}

const DATA = [
    {
        id: 1,
        homeType: 'Houses',
        address: '6231 Hacienda Pl',
        city: 'Hollywood',
        state: 'CA',
        bedroom: 4,
        bathroom: 3,
        price: 850000,
        squareFeet: 3115,
        lotSize: 4312,
        // features: [
        //   'Garage',
        //   'Swimming Pool',
        //   'Fireplace'
        // ],
        Garage: true,
        Swimming_Pool: true,
        Fireplace: true,
        Guest_House: false,
        image: './img/house_1.jpg'
    }, {
        id: 2,
        homeType: 'Condos',
        address: '511 Clark Way',
        city: 'Malibu',
        state: 'CA',
        bedroom: 3,
        bathroom: 2,
        price: 720000,
        squareFeet: 2785,
        lotSize: 4115,
        // features: [
        //   'Garage',
        //   'Fireplace',
        // ],
        Garage: true,
        Swimming_Pool: false,
        Fireplace: true,
        Guest_House: false,
        image: './img/house_2.jpg'
    }, {
        id: 3,
        homeType: 'Townhomes',
        address: '745 Granada Ave',
        city: 'Brentwood',
        state: 'CA',
        bedroom: 3,
        bathroom: 3,
        price: 785000,
        squareFeet: 2825,
        lotSize: 3824,
        // features: [
        //   'Garage',
        //   'Swimming Pool'
        // ],
        Garage: true,
        Swimming_Pool: true,
        Fireplace: false,
        Guest_House: false,
        image: './img/house_3.jpg'
    }, {
        id: 4,
        homeType: 'Houses',
        address: '2113 Park Pl',
        city: 'Hollywood',
        state: 'CA',
        bedroom: 4,
        bathroom: 4,
        price: 885000,
        squareFeet: 3815,
        lotSize: 4798,
        // features: [
        //   'Garage',
        //   'Swimming Pool',
        //   'Fireplace'
        // ],
        Garage: true,
        Swimming_Pool: true,
        Fireplace: true,
        Guest_House: false,
        image: './img/house_4.jpg'
    }, {
        id: 5,
        homeType: 'Condos',
        address: '638 Hollints Ct',
        city: 'Downey',
        state: 'CA',
        bedroom: 2,
        bathroom: 2,
        price: 620000,
        squareFeet: 2815,
        lotSize: 4035,
        // features: [
        //   'Garage',
        //   'Fireplace'
        // ],
        Garage: true,
        Swimming_Pool: false,
        Fireplace: true,
        Guest_House: false,
        image: './img/house_5.jpg'
    }, {
        id: 6,
        homeType: 'Houses',
        address: '854 Summit Dr',
        city: 'Beverly Hills',
        state: 'CA',
        bedroom: 4,
        bathroom: 3,
        price: 970000,
        squareFeet: 4316,
        lotSize: 6295,
        // features: [
        //   'Garage',
        //   'Swimming Pool',
        //   'Fireplace',
        //   'Guest House'
        // ],
        Garage: true,
        Swimming_Pool: true,
        Fireplace: true,
        Guest_House: true,
        image: './img/house_6.jpg'
    }
];
