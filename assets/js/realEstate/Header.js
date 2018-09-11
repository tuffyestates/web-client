import React, { Component} from 'react'


export default class Header extends Component {
  constructor () {
    super()
    this.state = {
      name: 'bern'
    }
  }
  render () {
    return (<header>
      <div className="logo"><span>bern</span>Estates</div>

      <nav>
        <a href="#">Create Ads</a>
      <a href="#">About Us</a>
    <a href="#">Log In</a>
        <a href="#" className="register-btn">Register</a>
      </nav>

    </header>)
  }
}
