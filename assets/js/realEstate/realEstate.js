import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Header from './Header.js'
import Filter from './Filter.js'
import Listings from './Listings'
import listingsData from './data/listingsData.js'
// Filter items with text fields

class App extends Component {
  constructor () {
    super()
    this.state = {
      name: 'bern',
      listingsData,
      city: 'all',
      homeType: 'all',
      bedroom: 0,
      bathroom: 0,
      min_price: 0,
      max_price: 10000000,
      min_squareFeet: 0,
      max_squareFeet: 10000,
      min_lotSize: 0,
      max_lotSize: 50000,
      Fireplace: false,
      Garage: false,
      Guest_House: false,
      Swimming_Pool: false,
      filteredData: listingsData,
      populateFormsData: '',
      sort_by: 'price-dsc',
      view: 'box',
      search: ''
    }

    this.change = this.change.bind(this)
    this.filteredData = this.filteredData.bind(this)
    this.populateForms = this.populateForms.bind(this)
    this.changeView = this.changeView.bind(this)

  }


  componentWillMount() {

    var listingsData = this.state.listingsData.sort((a, b) => {
      return a.price - b.price
    })

    this.setState({
      listingsData
    })
  }

  // method for filter
  change(event) {
    var name = event.target.name
    var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value

    this.setState({
      [name]: value
    }, () => {
      console.log(this.state.min_price)

      // call method to check input limits
      // this.checkInputLimits()

      this.filteredData()
    })
    // test for target value
    // console.log(event.target.value)
  }



  changeView(viewName) {
    this.setState({
      view: viewName
    })
  }


  // method for filtering data
  filteredData() {
    var newData = this.state.listingsData.filter((item) => {


      return item.price >= this.state.min_price &&
      item.price <= this.state.max_price &&
      item.squareFeet >= this.state.min_squareFeet && item.squareFeet <= this.state.max_squareFeet &&
      item.lotSize >= this.state.min_lotSize &&
      item.lotSize <= this.state.max_lotSize &&
      item.bedroom >= this.state.bedroom &&
      item.bathroom >= this.state.bathroom

    })

    if(this.state.city != "all") {
      newData = newData.filter((item) => {
        return item.city == this.state.city
      })
    }

    if(this.state.homeType != "all") {
      newData = newData.filter((item) => {
        return item.homeType == this.state.homeType
      })
    }

    if(this.state.sort_by == 'price-dsc') {
      newData = newData.sort((a, b) => {
        return a.price - b.price
      })
    }

    if(this.state.sort_by == 'price-asc') {
      newData = newData.sort((a, b) => {
        return b.price - a.price
      })
    }


    // search if statement
    if(this.state.search != '') {
      newData = newData.filter((item) => {
        var city = item.city.toLowerCase()
        var searchText = this.state.search.toLowerCase()
        var n = city.match(searchText)

        if(n != null) {
          return true
        }
      })
    }


    // if(this.state.city != "all") {
    //   newData = newData.filter((item) => {
    //     return item.city == this.state.city
    //   })
    // }

    // checkbox filter

    // if(this.state.Garage == true) {
    //   // console.log(item.features.Garage)
    //   newData = newData.filter((item) => {
    //
    //     var propsWithGarage[];
    //
    //     for (var i in item.features) {
    //
    //       if(item.features[i] == "Garage"){
    //         propsWithGarage[] = this.item
    //       }
    //         propsWithGarage = item.features[i]
    //         console.log(item.features[i])
    //
    //     }
    //     return item.features[i] == "Garage"
    //
    //   })
    // }

    if(this.state.Garage == true) {
      newData = newData.filter((item) => {
        return item.Garage == true
      })
    }

    if(this.state.Swimming_Pool == true) {
      newData = newData.filter((item) => {
        return item.Swimming_Pool == true
      })
    }

    if(this.state.Fireplace == true) {
      newData = newData.filter((item) => {
        return item.Fireplace == true
      })
    }

    if(this.state.Guest_House == true) {
      newData = newData.filter((item) => {
        return item.Guest_House == true
      })
    }

    this.setState({
      filteredData: newData
    })
  }



  populateForms() {
    // city
    var cities = this.state.listingsData.map((item) => {
      return item.city
    })
    cities = new Set(cities)
    // spread operator array
    cities = [...cities]

    // sort the data
    cities = cities.sort()


    // homeType
    var homeTypes = this.state.listingsData.map((item) => {
      return item.homeType
    })
    homeTypes = new Set(homeTypes)
    homeTypes = [...homeTypes]

    // sort the data
    homeTypes = homeTypes.sort()


    // bedroom
    var bedrooms = this.state.listingsData.map((item) => {
      return item.bedroom
    })
    bedrooms = new Set(bedrooms)
    bedrooms = [...bedrooms]

    // sort the data
    bedrooms = bedrooms.sort()

    // bathroom
    var bathrooms = this.state.listingsData.map((item) => {
      return item.bathroom
    })
    bathrooms = new Set(bathrooms)
    bathrooms = [...bathrooms]

    // sort the data
    bathrooms = bathrooms.sort()


    this.setState({
      populateFormsData: {
        cities,
        homeTypes,
        bedrooms,
        bathrooms
      }
    }, () => {
      console.log(this.state)
    })
  }


  render () {
    return (<div className="whole-screen">
      <Header />
    <section id="content-area">
        <Filter change={this.change} globalState={this.state} populateAction={this.populateForms} />
      <Listings listingsData={this.state.filteredData} change={this.change} globalState={this.state} changeView={this.changeView} />
      </section>
      </div>)
  }
}

const app = document.getElementById('app')

ReactDOM.render(<App />, app)
