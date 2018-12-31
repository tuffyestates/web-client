import React from 'react';
import {Link} from 'react-router-dom';
import set from 'lodash.set';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faPlus} from '@fortawesome/free-solid-svg-icons';

import {debounce} from '../../utils';
import {Primary} from '../../components/button';
import Colors from '../../colors';
import Listings from './listings';
import Filter from './filter';

export default class Container extends React.PureComponent {
    state = {
        filters: {}
    }
    onFilterChange = debounce((e) => {
        let filters = Object.assign({}, this.state.filters);
        let value = e.target.value || e.target.files;
        if (value === '' || value === null)
            value = undefined;
        set(filters, e.target.name, value);
        this.setState({filters});
    }, 400);
    render() {
        return (<div css={{
                display: 'flex',
                justifyContent: 'flex-stretch',
                height: '100%',
            }}>
            <div css={{
                    width: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'stretch',
                }}>
                <Filter css={{
                        fontFamily: 'cabin',
                        fontWeight: '200',
                        backgroundColor: Colors.blue,
                        color: 'white',
                        flex: 1,
                        padding: '1em 2em',
                        overflow: 'auto',
                        boxSizing: 'border-box',
                    }} onChange={(e) => {
                        e.persist();
                        this.onFilterChange(e);
                    }}/>
                <Link to="/properties/create">
                    <Primary css={{
                            width: '100%',
                            position: 'relative',
                            paddingTop: '2em',
                            paddingBottom: '2em',
                            ':hover': {
                                boxShadow: "0 0px 5px -3px rgb(0, 0, 0) inset"
                            }
                        }}>
                        <span className="fa-stack" css={{
                                position: 'absolute',
                                top: '50%',
                                fontSize: '1.3em',
                                right: '10%',
                                transform: 'translateY(-50%)',
                            }}>
                            <FontAwesomeIcon icon={faHome} className="fa-stack-2x" style={{
                                    color: '#ffffff'
                                }}/>
                            <FontAwesomeIcon icon={faPlus} className="fa-stack-1x" style={{
                                    filter: `drop-shadow(-1.5px -1.5px 0px ${Colors.orange}) drop-shadow(-1.5px 1.5px 0px ${Colors.orange})`,
                                    marginRight: '-0.19em',
                                    marginBottom: '-0.25em',
                                    color: `white`,
                                }}/>
                        </span>
                        Post a Listing</Primary>
                </Link>
            </div>
            <div css={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <Listings css={{
                        flex: 1
                    }} filters={this.state.filters}/>
            </div>
        </div>);
    }
}
