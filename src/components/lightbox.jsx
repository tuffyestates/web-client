import React from "react";
import PropTypes from "prop-types";

export default class Lightbox extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        let _self = this;
        if (this.props.open) {
            window.addEventListener("keydown", this.didUserHitEsc.bind(_self), {
                passive: true
            });
        }
    }
    close() {
        let _self = this;
        window.removeEventListener("keypress", this.didUserHitEsc.bind(_self));
        this.props.onRequestClose();
    }
    didUserHitEsc(event) {
        if (event.keyCode === 27) {
            this.close();
        }
    }
    componentWillUnmount() {
        this.props.onRequestClose();
    }
    render() {
        const {children, open, ...passthrough} = this.props;
        return (
            <div
                {...passthrough}
                css={{
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#0000004d',
                    zIndex: 10,
                    display: open ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div
                    css={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "block",
                        cursor: "zoom-out",
                        '~ *': {
                            zIndex: 1,
                            boxShadow: '0 7px 9px -4px rgba(0,0,0,.2), 0 14px 21px 2px rgba(0,0,0,.14), 0 5px 26px 4px rgba(0,0,0,.12)'
                        }
                    }}
                    onClick={this.close.bind(this)}
                />
                {children}
            </div>
        );
    }
    static propTypes = {
        open: PropTypes.bool,
        onRequestClose: PropTypes.func.isRequired,
        className: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ])
    };
    static docProps = {
        onRequestClose: () => {}
    };
}
