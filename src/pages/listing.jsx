import React from 'react';
import Colors from '../colors';

export default class Listing extends React.PureComponent {
    constructor(...args) {
        super(...args);

        setTimeout(() => {
            this.setState({
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
            });
        }, 100)

    }
    render() {
        return (<div>
            <pre>{JSON.stringify(this.state, null, 4)}</pre>
        </div>);
    }
}
