import React from 'react';
import Colors from '../colors';
import {Button, ProgressiveImage} from '../components';
/** @jsx jsx */
import {jsx} from '@emotion/core';
// width: '100%',
// objectFit: 'cover',
// maxHeight: '30em'
class Jumbo extends React.PureComponent {
    priceFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    state = {};
    render() {
        const imageSrc = `${process.env.STATIC_PATH}/property/image/${this.props.id}.jpg`;
        return (<div css={{
                width: '100%'
            }}>
            <ProgressiveImage preview={previewImage} src={imageSrc} css={{
                    height: '30em',
                    objectFit: 'cover',
                    width: '100%'
                }} />
            <div css={{
                    backgroundColor: '#000c'
                }}>
                <div css={{
                        maxWidth: 1080,
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '1em',
                        color: 'white',
                        fontFamily: 'Roboto',
                        fontWeight: 300,
                        fontSize: '1.2em'
                    }}>
                    <div>{this.props.address}</div>
                    <div>{this.priceFormatter.format(this.props.price)}</div>
                </div>
            </div>
        </div>);
    }
}
export default class Property extends React.PureComponent {
    state = {};
    style = {
        header: {
            borderBottom: `1.5px solid ${Colors.orange}`,
            fontWeight: 300
        }
    };
    constructor(props) {
        super(props);
        const id = props.match.params.id;
        this.state = props.location.state || {};

        setTimeout(() => {
            this.setState({
                id,
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
        }, 500);

    }
    render() {
        if (!this.state.id) {
            return null;
        }
        return (<div>
            <Jumbo id={this.state.id} previewImage={this.state.previewImage} address={this.state.address} price={this.state.price}/>
            <div css={{
                    display: 'grid',
                    maxWidth: 1080,
                    padding: '1em',
                    gridColumnGap: '2em',
                    gridTemplateColumns: 'calc(66.6666% - 1em) calc(33.3333% - 1em)',
                    margin: '0 auto',
                    border: '1px solid #eee',
                    fontFamily: 'Roboto',
                    fontWeight: 300
                }}>
                <div css={{
                        gridRowStart: 1,
                        gridRowEnd: 'span 3'
                    }}>
                    <h3 css={this.style.header}>Description</h3>
                    <p>Et veniam incididunt domesticarum, noster a nam tempor incididunt. Ea excepteur exercitation o admodum voluptatibus se aliquip, officia quorum commodo id fore occaecat eu praesentibus. Sed ubi nulla possumus, summis cupidatat sed aliquip ubi tamen doctrina philosophari, irure admodum adipisicing, doctrina cillum nisi ita dolor te nescius est aliqua se aliquip ad excepteur, officia adipisicing do quamquam.Iis aute ut nulla. Nisi arbitror cernantur. Mandaremus magna occaecat, possumus summis deserunt doctrina te eu o culpa voluptate do ubi hic noster quem velit. Aliquip culpa eu consequat fidelissimae.</p>
                </div>
                <div>
                    <h3 css={this.style.header}>Specifications</h3>
                    <p>lorem</p>
                </div>
                <div>
                    <h3 css={this.style.header}>Features</h3>
                    <p>lorem</p>
                </div>
                <Button>Contact Owner</Button>
            </div>
        </div>);
    }
}

const previewImage = 'data:image/jpeg;base64,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';
