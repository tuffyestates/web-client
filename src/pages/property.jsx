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
        const thumbnailImageSrc = `${process.env.STATIC_PATH}/property/image/${this.props.id}-thumbnail.jpg`;
        const imageSrc = `${process.env.STATIC_PATH}/property/image/${this.props.id}.jpg`;
        return (<div css={{
                width: '100%'
            }}>
            <ProgressiveImage preview={thumbnailImageSrc} src={imageSrc} css={{
                    height: '30em',
                    objectFit: 'cover',
                    width: '100%',
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
