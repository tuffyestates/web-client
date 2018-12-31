import React from 'react';
import PropTypes from 'prop-types';
import merge from 'deepmerge';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons';

import Colors from '../../colors';
import { Editable, LoadingAnimation, } from '../../components';
import { Form } from '../../components';
import { Primary } from '../../components/button';
import Header from './header';
import { Features, Specifications, Map, } from './details';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.7)';
Modal.defaultStyles.overlay.zIndex = '999999999999999';

export default class Property extends React.Component {
    dialogElement = document.createElement('div');

    state = {
        messageSending: false,
        messageSubmitted: false,
        contactSellerFormModalOpen: false,
        property: {
            _id: '',
            address: '',
            price: '',
            specification: {
                built: '',
                size: '',
                lot: '',
                bathrooms: '',
                bedrooms: ''
            },
            location: {
                lat: '',
                lng: ''
            },
            features: {}
        }
    }
    style = {
        header: {
            borderBottom: `1.5px solid ${Colors.lightOrange}`,
            fontWeight: 300,
        }
    };
    static getDerivedStateFromProps(props, state) {
        return { property: merge(state.property, props.property) };
    }

    showContactSellerForm = () => {
        this.setState({ contactSellerFormModalOpen: true })
    }


    hideContactSellerForm = () => {
        this.setState({
            contactSellerFormModalOpen: false,
            messageSending: false,
            messageSubmitted: false,
        })
    }

    // eslint-disable-next-line
    renderContactSellerFormModal = () => {
        const { contactSellerFormModalOpen, messageSending, messageSubmitted } = this.state;

        return (
            <Modal
                isOpen={contactSellerFormModalOpen}
                onRequestClose={this.hideContactSellerForm}
                contentLabel="Example Modal"
                style={{
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                <div>
                    <Primary
                        style={{ fontSize: '1em', backgroundColor: 'gray' }}
                        css={{ marginBottom: '1em' }}
                        onClick={this.hideContactSellerForm}>
                        <FontAwesomeIcon icon={faTimes} />
                        <span css={{ marginLeft: 5 }}>Close</span>
                    </Primary>
                    <form onSubmit={this.handleContactSeller}>
                        <Form.Input css={{ marginBottom: '1em' }} placeholder="Message Title" name="messageTitle" autoFocus={true} />
                        <Form.Textarea css={{ marginBottom: '1em' }} placeholder="Message Body" name="messageBody" />
                        {(!messageSending && !messageSubmitted)
                            && <Primary css={{ marginTop: '1em' }}>Submit</Primary>
                        }

                        {messageSending && <span><FontAwesomeIcon icon={faSpinner} className="fa-spin" /> Sending...</span>}
                        {messageSubmitted && <span css={{ color: 'green' }} ><FontAwesomeIcon icon={faCheck} /> Message Sent!</span>}
                    </form>
                </div>
            </Modal>
        )
    }

    updateMessageSubmitted = val => {
        this.setState({ messageSubmitted: val })
    }

    handleContactSeller = (e) => {
        e.preventDefault();

        this.setState(() => ({ messageSending: true }));

        setTimeout(() => {
            this.setState(() => ({ messageSending: false, messageSubmitted: true }), () => {
                setTimeout(() => {
                    this.hideContactSellerForm();
                }, 1500);
            });
        }, 1200)

    }

    render() {
        const editable = this.props.mode === 'edit' || this.props.mode === 'create';
        // Loading animation
        if (this.state.property._id === '' && this.props.mode !== 'create') {
            return (<div css={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                height: '100%',
            }}><LoadingAnimation /></div>);
        }

        return (<React.Fragment>
            <Header editable={editable} onChange={this.props.onChange} previewImage={this.props.previewImage} property={this.state.property} />
            <div css={{
                display: 'grid',
                maxWidth: 1080,
                boxSizing: 'border-box',
                padding: '1em',
                gridColumnGap: '2em',
                gridTemplateColumns: 'calc(66.6666% - 1em) calc(33.3333% - 1em)',
                margin: '0 auto',
                border: '1px solid #eee',
                fontFamily: 'Roboto',
                fontWeight: 300,
                backgroundColor: '#fcfcfc'
            }}>
                <div css={{
                    gridRowStart: 1,
                    gridRowEnd: 'span 4',
                }}>
                    <h3 css={this.style.header}>Description</h3>

                    <Editable.Textarea name="description" required={true} editable={editable} onChange={this.props.onChange} css={{
                        width: '100%'
                    }} value={this.state.property.description} placeholder="Description" textareaStyle={{
                        paddingLeft: 0,
                        paddingRight: 0,
                    }} />
                </div>
                <div>
                    <h3 css={this.style.header}>Specifications</h3>
                    <Specifications editable={editable} property={this.state.property} onChange={this.props.onChange} />
                </div>
                <div>
                    <h3 css={this.style.header}>Features</h3>
                    <Features editable={editable} property={this.state.property} onChange={this.props.onChange} />
                </div>
                <div>
                    <h3 css={this.style.header}>Map</h3>
                    <Map position={[this.state.property.location.lat, this.state.property.location.lng,]} />
                </div>
                <Primary
                    css={{ marginTop: '1em' }}
                    disabled={editable}
                    onClick={this.showContactSellerForm}>
                    Contact Owner
                </Primary>
            </div>
            {this.renderContactSellerFormModal()}
        </React.Fragment>);
    }
    static propTypes = {
        /**
         * Define if the content should be editable
         */
        mode: PropTypes.oneOf(['edit', 'view', 'create',]).isRequired,
        /**
         * Data about the property
         */
        property: PropTypes.object.isRequired,
        /**
         * Handle input change events
         */
        onChange: PropTypes.func,
    };
}
