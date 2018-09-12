import React from 'react';
import Colors from '../colors';

const HOME_DETAILS_PADDING = '0.5em';

class Listings extends React.Component {
    render() {
        const homes = this.props.listings.reduce((arr, house, idx) => {
            arr.push(<Home key={idx} street={house.address} price={house.price} id={house.id}/>)
            return arr;
        }, []);
        return (<div style={{
                display: 'flex',
                flexWrap: 'wrap',
                flex: 1,
                alignContent: 'flex-start',
                justifyContent: 'center'
            }}>
            {homes}
        </div>);
    }
}
class HomeDetails extends React.PureComponent {
    priceFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    render() {
        return (<div style={{
                padding: HOME_DETAILS_PADDING
            }} {...this.props}>
            <span>{this.priceFormatter.format(this.props.price)}</span>
        </div>);
    }
}
class Home extends React.PureComponent {
    render() {
        return (<div style={{
                boxShadow: '0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)',
                margin: '1em',
                flex: 1,
                minWidth: 400,
                maxWidth: 500,
                borderRadius: 2,
                overflow: 'hidden'
            }} {...this.props}>

            {/* Image Container */}
            <div style={{
                    position: 'relative'
                }}>
                <img src={process.env.NODE_ENV === 'production'
                        ? `/api/listing/image/${this.props.id}.jpg`
                        : require(`../../test/api/listing/image/${this.props.id}.jpg`)} style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: 250,
                        display: 'block'
                    }}/> {/* Street Address */}
                <div style={{
                        position: 'absolute',
                        bottom: 0,
                        padding: `0.6em ${HOME_DETAILS_PADDING}`,
                        color: 'white',
                        textShadow: '1px 1px 1px black'
                    }}>{this.props.street}</div>
            </div>

            <HomeDetails price={this.props.price}/>
        </div>);
    }
}
class Filter extends React.PureComponent {
    render() {
        return (<div style={{
                backgroundColor: Colors.blue,
                width: 400,
                color: 'white',
                padding: '1em'
            }} {...this.props}>This is the filter sidebar</div>);
    }
}

// TODO: This should be replaced by infinite scrolling
class Paging extends React.PureComponent {
    render() {
        let pageNumbers = [];
        const start = Math.max(1, this.props.page - 5);
        const end = Math.min(start + 5 + (this.props.page - start), this.props.numPages)
        for (let i = start; i <= end; i++) {
            pageNumbers.push(<span style={{
                    display: 'inline-block',
                    cursor: 'pointer',
                    padding: '1em',
                    backgroundColor: Colors.blue,
                    color: 'white'
                }} key={i} onClick={this.props.onPageChange.bind(this, i)}>{i}</span>);
        }
        return (<div style={{
                textAlign: 'center'
            }}>
            {pageNumbers}
        </div>);
    }
}

class ControlBar extends React.PureComponent {
    render() {
        return (<div>
            <label>
                Listings Per Page:
                <select name="listingsPerPage" value={this.props.controls.listingsPerPage} onChange={this.props.onChange}>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                </select>
            </label>
        </div>);
    }
}

export default class Container extends React.PureComponent {
    state = {
        page: 1,
        listingsPerPage: 10,
        filters: {}
    }
    filter(data) {
        // TODO: use this.state.filters to filter data
        return data;
    }
    page(data, page = 1, perPage = 10) {
        return data.slice((page - 1) * perPage, page * perPage);
    }
    render() {
        const filteredData = this.filter(DATA);
        return (<div style={{
                display: 'flex',
                justifyContent: 'flex-stretch',
                height: '100%'
            }}>
            <Filter filters={this.state.filters}/>
            <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1em'
                }}>
                <ControlBar controls={{
                        listingsPerPage: this.state.listingsPerPage
                    }} onChange={e => this.setState({
                        [e.target.name]: e.target.value
                    })}/>
                <Listings style={{
                        flex: 1
                    }} listings={this.page(filteredData, this.state.page, this.state.listingsPerPage)}/>
                <Paging page={this.state.page} numPages={Math.ceil(filteredData.length / this.state.listingsPerPage)} onPageChange={page => this.setState({page})}/>
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
