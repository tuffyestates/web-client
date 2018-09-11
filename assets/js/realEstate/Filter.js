import React, { Component} from 'react'


export default class Filter extends Component {
  constructor () {
    super()
    this.state = {
      name: 'bern'
    }
    this.cities = this.cities.bind(this)
    this.homeTypes = this.homeTypes.bind(this)
    this.bedrooms = this.bedrooms.bind(this)
    this.bathrooms = this.bathrooms.bind(this)
  }

  componentWillMount(){
    this.props.populateAction()
  }


  cities() {
    if(this.props.globalState.populateFormsData.cities != undefined) {
      // means var = this.props.globalState.populateFormsData.cities
      var { cities } = this.props.globalState.populateFormsData

      // console.log(cities)

      return cities.map((item) => {
        return(
        <option key={item} value={item}>{item}</option>
        )
      })
    }

  }

  homeTypes() {
    if(this.props.globalState.populateFormsData.homeTypes != undefined) {
      // means var = this.props.globalState.populateFormsData.homeTypes
      var { homeTypes } = this.props.globalState.populateFormsData

      // console.log(homeTypes)

      return homeTypes.map((item) => {
        return(
        <option key={item} value={item}>{item}</option>
        )
      })
    }
  }

  bedrooms() {
    if(this.props.globalState.populateFormsData.bedrooms != undefined) {
      // means var = this.props.globalState.populateFormsData.bedrooms
      var { bedrooms } = this.props.globalState.populateFormsData

      // console.log(bedrooms)

      return bedrooms.map((item) => {
        return(
        <option key={item} value={item}>{item}+ Bedrooms</option>
        )
      })
    }
  }

  bathrooms() {
    if(this.props.globalState.populateFormsData.bathrooms != undefined) {
      // means var = this.props.globalState.populateFormsData.cities
      var { bathrooms } = this.props.globalState.populateFormsData

      // console.log(bathrooms)

      return bathrooms.map((item) => {
        return(
        <option key={item} value={item}>{item}+ Bathrooms</option>
        )
      })
    }
  }


  render () {
    return (<section id="filter">
    <div className="inside">
      <h4>Filter</h4>
    {/* setup change() */}
      <select name="city" className="filters city" onChange={this.props.change}>
        <option value="all">All Cities</option>
        {this.cities()}
      </select>
      <select name="homeType" className="filters homeType" onChange={this.props.change}>
        <option value="all">All Home Types</option>
        {this.homeTypes()}
      </select>
      <select name="bedroom" className="filters bedroom" onChange={this.props.change}>
        <option value="0">0+ Bedrooms</option>
        {this.bedrooms()}
      </select>
      <select name="bathroom" className="filters bathroom" onChange={this.props.change}>
        <option value="0">0+ Bathrooms</option>
        {this.bathrooms()}
      </select>
      <div className="filters price" onChange={this.props.change}>
        <span className="title">Price</span>

        {/* alternate input type to confirm numeric input */}
        {/* type="number" pattern="[0-9]*" inputmode="numeric" */}

        <input type="number" pattern="[0-9]*" inputMode="numeric" min="0" max="1000000" step="100000" name="min_price" className="min-price" onChange={this.props.change} value={this.props.globalState.min_price} />
        <input type="number" pattern="[0-9]*" inputMode="numeric" min="0" max="1000000" step="100000" name="max_price" className="max-price" onChange={this.props.change} value={this.props.globalState.max_price} />
      </div>
      <div className="filters squareFeet">
        <span className="title">Square Feet</span>
        <input type="number" pattern="[0-9]*" inputMode="numeric" min="0" max="10000" step="100" name="min_squareFeet" className="min-squareFeet" onChange={this.props.change} value={this.props.globalState.min_squareFeet} />
        <input type="number" pattern="[0-9]*" inputMode="numeric" min="0" max="10000" step="100" name="max_squareFeet" className="max-squareFeet" onChange={this.props.change} value={this.props.globalState.max_squareFeet} />
      </div>
      <div className="filters lotSize">
        <span className="title">Lot Size</span>
        <input type="number" pattern="[0-9]*" inputMode="numeric" min="0" max="50000" step="1000" name="min_lotSize" className="min-lotSize" onChange={this.props.change} value={this.props.globalState.min_lotSize} />
        <input type="number" pattern="[0-9]*" inputMode="numeric" min="0" max="50000" step="1000" name="max_lotSize" className="max-lotSize" onChange={this.props.change} value={this.props.globalState.max_lotSize} />
      </div>
      <div className="filters features">
        <span className="title">Features</span>
        <label htmlFor="features">
          <span>Garage</span>
          <input name="Garage" value="Garage" type="checkbox" onChange={this.props.change} />
        </label>
        <label htmlFor="features">
          <span>Swimming Pool</span>
          <input name="Swimming_Pool" value="Swimming_Pool" type="checkbox" onChange={this.props.change} />
        </label>
        <label htmlFor="features">
          <span>Fireplace</span>
          <input name="Fireplace" value="Fireplace" type="checkbox" onChange={this.props.change} />
        </label>
        <label htmlFor="features">
          <span>Guest House</span>
          <input name="Guest_House" value="Guest_House" type="checkbox" onChange={this.props.change} />
        </label>
      </div>

    </div>
    </section>)
  }
}
