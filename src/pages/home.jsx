import React from 'react';
import {Link} from 'react-router-dom';
import {css} from 'emotion';

class Jumbotron extends React.PureComponent {
    style = {
        container: {
            width: 'calc(56.25% + 30px)',
            position: 'absolute',
            height: '100%',
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textTransform: 'uppercase',
            fontFamily: 'Cabin',
            color: 'white',
            textDecoration: 'none',
            transition: 'all 0.3s'
        },
        headerBig: {
            fontSize: '5em',
            margin: '0',
            lineHeight: '0.7em',
            fontWeight: 400
        },
        headerSmall: {
            fontWeight: 'normal',
            fontSize: '1.3em',
            margin: '0.5em 0'
        }
    };
    render() {
        return (<div style={{
                position: 'relative',
                overflow: 'hidden',
                ...this.props.style
            }}>
            <Link to='/listings' className={css(`&:hover {transform: translateX(0) !important}`)} style={{
                    ...this.style.container,
                    left: 0,
                    transform: 'translateX(-20px)',
                    clipPath: 'polygon(0 0, 100% 0%, 75% 100%, 0% 100%)',
                    background: `linear-gradient(rgba(0, 55, 107, 0.8), rgba(0, 55, 107, 0.8)), url(${require('../images/jesse-roberts-146556-unsplash.jpg?size=2000')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <h1 style={{
                        ...this.style.headerBig,
                        marginLeft: '0.1em'
                    }}>Sell</h1>
                <h4 style={this.style.headerSmall}>Your Home</h4>
            </Link>
            <Link to='/listings' className={css(`&:hover {transform: translateX(0) !important}`)} style={{
                    ...this.style.container,
                    right: 0,
                    transform: 'translateX(20px)',
                    clipPath: 'polygon(25% 0, 100% 0%, 100% 100%, 0 100%)',
                    background: `linear-gradient(rgba(255, 104, 0, 0.8), rgba(255, 104, 0, 0.8)), url(${require('../images/rowan-heuvel-51244-unsplash.jpg?size=2000')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <h1 style={{
                        ...this.style.headerBig,
                        marginLeft: '0.1em'
                    }}>Buy</h1>
                <h4 style={this.style.headerSmall}>Your Home</h4>
            </Link>
        </div>);
    }
}

export default class Home extends React.Component {

    render() {
        return (<Jumbotron style={{
                margin: '1em 0',
                height: 500
            }}/>);
    }
}
