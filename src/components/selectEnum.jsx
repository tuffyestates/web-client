import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import Colors from '../colors';

export default class SelectEnum extends React.PureComponent {
    render() {
        const {name, onChange} = this.props;
        const options = React.Children.map(this.props.children, child => {
            const {children, className, ...passthrough} = child.props;
            const id = shortid.generate();
            return (<div css={{
                    backgroundColor: 'white',
                    'input[type="radio"]:checked + label' : {
                        backgroundColor: Colors.orange,
                        color: 'white'
                    },
                }} className={className} key={child.props.value}>

                <input {...passthrough} id={id} name={name} onChange={onChange} style={{
                        display: 'none',
                    }} type="radio"/>
                <label htmlFor={id} css={{
                        display: 'inline-block',
                        padding: '0.5em 1em',
                        cursor: 'pointer',
                        ':hover' : {
                            boxShadow: '0 0 7px -5px inset black'
                        }
                    }}>{children}</label>

            </div>)
        });
        return (<div css={{
                display: 'flex',
                alignItems: 'center'
            }} className={this.props.className}>
            {options}
        </div>);
    }
    static propTypes = {
        /**
         * Name prop given to all of the options
         */
        name: PropTypes.string,
        /**
         * An array containing several option elements.
         */
        children: PropTypes.arrayOf(PropTypes.element.isRequired),
        /**
         * Display the left or right of the current selection as also selected
         */
        // select: PropTypes.oneOf(['left', 'right', false])
    };
    static defaultProps = {
        children: [],
        // select: false
    };
    static docProps = {
        name: "doc-test",
        children: [
            /* eslint-disable react/jsx-key */
            <option value={1}>Option 1</option>,
            <option defaultChecked={true} value={2}>Option 2</option>,
            <option value={3}>Option 3</option>
            /* eslint-enable react/jsx-key */
        ]
    };
}
