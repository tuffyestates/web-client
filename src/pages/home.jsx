import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faHandHoldingUsd, faSearch} from '@fortawesome/free-solid-svg-icons';
/** @jsx jsx */
import {jsx} from '@emotion/core';

import Colors from '../colors';

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
            transition: 'all 0.3s',
            '&:hover': {
                transform: 'translateX(0) !important'
            }
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
        return (<div className={this.props.className} css={{
                position: 'relative',
                overflow: 'hidden'
            }}>
            <Link to='/properties/create' css={{
                    ...this.style.container,
                    left: -5,
                    transform: 'translateX(-20px)',
                    clipPath: 'polygon(0 0, 100% 0%, 75% 100%, 0% 100%)',
                    background: `linear-gradient(rgba(0, 55, 107, 0.8), rgba(0, 55, 107, 0.8)), url(${require('../assets/images/jesse-roberts-146556-unsplash.jpg?size=2000')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <h1 css={{
                        ...this.style.headerBig,
                        marginLeft: '0.1em'
                    }}>Sell</h1>
                <h4 css={this.style.headerSmall}>Your Home</h4>
            </Link>
            <Link to='/properties' css={{
                    ...this.style.container,
                    right: -5,
                    transform: 'translateX(20px)',
                    clipPath: 'polygon(25% 0, 100% 0%, 100% 100%, 0 100%)',
                    background: `linear-gradient(rgba(255, 104, 0, 0.8), rgba(255, 104, 0, 0.8)), url(${require('../assets/images/rowan-heuvel-51244-unsplash.jpg?size=2000')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <h1 css={{
                        ...this.style.headerBig,
                        marginLeft: '0.1em'
                    }}>Buy</h1>
                <h4 css={this.style.headerSmall}>Your Home</h4>
            </Link>
        </div>);
    }
}

class InfoCircle extends React.PureComponent {

    render() {
        return (<div className={this.props.className} css={{
                width: '25%'
            }}>
            <div css={{
                    textAlign: 'center'
                }}><FontAwesomeIcon css={{
                fontSize: '3em',
                padding: 30,
                borderRadius: '100%',
                backgroundColor: Colors.orange,
                color: 'white'
            }} icon={this.props.icon}/></div>
            <div css={{
                    textAlign: 'center',
                    fontSize: '0.9em',
                    marginTop: '1em'
                }}>{this.props.text}</div>
        </div>);

    }
}

export default class Home extends React.Component {

    render() {
        return (<React.Fragment><Jumbotron css={{
                marginBottom: '1em',
                height: 450,
                maxHeight: '80vh'
            }}/>
            <div css={{
                    fontFamily: 'Cabin',
                    fontSize: 18,
                    color: Colors.blue,
                    letterSpacing: 1,
                    display: 'flex',
                    height: 100,
                    justifyContent: 'space-around',
                    margin: '2em auto',
                    maxWidth: 1080
                }}>
                <InfoCircle icon={faHome} text="Search through over 25 different properties"/>
                <InfoCircle icon={faHandHoldingUsd} text="Define your budget, along with 22 other parameters"/>
                <InfoCircle icon={faSearch} text="Find the perfect home for you and your family"/>
            </div>
        </React.Fragment>);
    }
}

/*   MIKEY TESTING SECTON
class TestButton extends React.Component {

getIconImage =() => {
  if (this.props.Name === "Home")
  {
    return house
  }

}

  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <>


      <button onClick={this.handleClick}>
        <img src={this.getIconImage()}/>

      </button>
      </>
    );

  }
}
*/
