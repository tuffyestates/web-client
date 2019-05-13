import React from 'react';
import {Link} from 'react-router-dom';
import {Subscribe} from "@fallingsnow/react-contextual";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faLock} from "@fortawesome/free-solid-svg-icons";

// import Colors from '../../colors';
import Colors from "../../colors";
import {Account} from "../../contexts";
import {FallbackImage} from '../../components';

export default class Property extends React.PureComponent {
    priceFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });
    render() {
        return (<Subscribe to={Account}>
            {account => <Link css={{
                boxShadow: '0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)',
                display: 'block',
                flex: 1,
                minWidth: 400,
                maxWidth: 500,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s',
                '&:hover' : {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 7px -4px rgba(0,0,0,.2),0 11px 15px 1px rgba(0,0,0,.14),0 4px 20px 3px rgba(0,0,0,.12)',
                },
            }} to={{
                pathname: `/properties/${this.props.id}`
            }} {...this.props}>


            {/* Image Container */}
            <div css={{
                    position: 'relative'
                }}>
                <FallbackImage src={`${process.env.STATIC_PATH}/property/image/${this.props.id}-500.jpg`} css={{
                        objectFit: 'cover',
                        width: '100%',
                        height: 250,
                        display: 'block',
                    }}/> {/* Street Address */}
                <div css={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        padding: `0.6em 0.5em`,
                        color: 'white',
                        textShadow: '1px 1px 1px black',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>{account.id === this.props.owner ? <FontAwesomeIcon icon={faUser}/> : <span/>}{this.priceFormatter.format(this.props.price)}</div>
                <div css={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: `0.6em 0.5em`,
                        color: 'white',
                        textShadow: '1px 1px 1px black',
                    }}>{this.props.address}</div>
            </div>
        </Link>}
      </Subscribe>);
    }
}
