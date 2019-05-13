import React from "react";
import PropTypes from "prop-types";

import { Primary } from "./button";
import { Input } from "./form";
import Colors from "../colors";
import api from "../api";

class Popup extends React.PureComponent {
  static inputStyle = {
    marginBottom: "1em"
  };
  sendOffer = async event => {
    event.preventDefault();

    // Convert form to FormData
    const formdata = new FormData(event.currentTarget);

    try {
      const response = await api.post("/offers/email", formdata);

      console.debug(response);

      console.info("Offer submitted!");
    } catch (error) {
      // The account.login action failed for some reason, lets inform the user
      console.error(error);
    }
  };
  render() {
    const { open, ...props } = this.props;
    return (
      <form
        onSubmit={this.sendOffer}
        css={{
          display: open ? "block" : "none",
          position: "absolute",
          bottom: "100%",
          padding: "1em",
          backgroundColor: "white"
        }}
      >
        <h3>Make a trade</h3>
        <Input
          placeholder="Name"
          type="text"
          name="name"
          inputStyle={this.inputStyle}
        />
        <Input
          placeholder="Phone"
          type="text"
          name="phone"
          inputStyle={this.inputStyle}
        />
        <select name="tradeOffer" inputStyle={this.inputStyle}>
          <option value="home1">123 Easy St.</option>
          <option value="home2">420 Blaze Rd.</option>
        </select>
        <Input
          placeholder="Cash Offer $"
          type="text"
          name="addCash"
          inputStyle={this.inputStyle}
        />
        <textarea
          placeholder="Comments"
          name="message"
          rows="4"
          cols="20"
          inputStyle={this.inputStyle}
        />
        <Input type="submit" value="Send Offer" />
      </form>
    );
  }
}

export default class Trade extends React.PureComponent {
  state = {
    open: false
  };
  openTooltip = () => this.setState({ open: !this.state.open });
  render() {
    return (
      <div css={{ position: "relative" }}>
        <Primary {...this.props} onClick={this.openTooltip}>
          Swap
        </Primary>
        <Popup open={this.state.open} />
      </div>
    );
  }
  static propTypes = {};
  static defaultProps = {};
  static docProps = {
    children: "Hello!"
  };
}
