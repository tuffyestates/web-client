import React from 'react';

class Listings extends React.Component {
    render() {
        return (<div style={{
                display: 'flex'
            }}><Home street="1234 Road Ln." id="1"/></div>);
    }
}
class Home extends React.Component {
    render() {
        return (<div style={{
                width: 300,
                height: 150,
                backgroundColor: 'red',
                boxShadow: '0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)',
                margin: '1em',
                backgroundImage: `url(${process.env.BASE_DOMAIN}/listing/image/${this.props.id}).png`
            }} {...this.props}>{this.props.street}</div>);
    }
}
class Filter extends React.Component {
    render() {
        return (<div style={{
                backgroundColor: 'blue',
                width: 400
            }} {...this.props}></div>);
    }
}

export default class Container extends React.Component {
    state = {
        filters: {}
    }
    render() {
        return (<div style={{
                display: 'flex',
                justifyContent: 'flex-stretch'
            }}>
            <Filter filters={this.state.filters}/>
            <Listings data={data} filters={this.state.filters}/>
        </div>);
    }
}

const data = [
    {
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
    }, {
        homeType: 'Townhomes',
        address: '9821 Crossroads Blvd',
        city: 'Malibu',
        state: 'CA',
        bedroom: 3,
        bathroom: 2,
        price: 690000,
        squareFeet: 3305,
        lotSize: 4485,
        // features: [
        //   'Garage',
        //   'Swimming Pool',
        //   'Fireplace',
        // ],
        Garage: true,
        Swimming_Pool: true,
        Fireplace: true,
        Guest_House: false,
        image: './img/house_7.jpg'
    }, {
        homeType: 'Houses',
        address: '341 Bright Way',
        city: 'Brentwood',
        state: 'CA',
        bedroom: 3,
        bathroom: 2,
        price: 590000,
        squareFeet: 3214,
        lotSize: 4572,
        // features: [
        //   'Garage',
        //   'Fireplace'
        // ],
        Garage: true,
        Swimming_Pool: false,
        Fireplace: true,
        Guest_House: false,
        image: './img/house_8.jpg'
    }, {
        homeType: 'Condos',
        address: '536 Stormy St',
        city: 'Santa Monica',
        state: 'CA',
        bedroom: 4,
        bathroom: 2,
        price: 770000,
        squareFeet: 3475,
        lotSize: 4622,
        // features: [
        //   'Garage',
        //   'Swimming Pool',
        //   'Fireplace'
        // ],
        Garage: true,
        Swimming_Pool: true,
        Fireplace: true,
        Guest_House: false,
        image: './img/house_9.jpg'
    }
];
