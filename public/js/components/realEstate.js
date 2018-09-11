webpackJsonp([0],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var listingsData = [{
  homeType: 'Houses',
  address: '6231 Hacienda Pl',
  city: 'Hollywood',
  state: 'CA',
  bedroom: 4,
  bathroom: 3,
  price: 850000,
  squareFeet: 3115,
  lotSize: 4312,
  // features: [
  //   'Garage',
  //   'Swimming Pool',
  //   'Fireplace'
  // ],
  Garage: true,
  Swimming_Pool: true,
  Fireplace: true,
  Guest_House: false,
  image: './img/house_1.jpg'

}, {
  homeType: 'Condos',
  address: '511 Clark Way',
  city: 'Malibu',
  state: 'CA',
  bedroom: 3,
  bathroom: 2,
  price: 720000,
  squareFeet: 2785,
  lotSize: 4115,
  // features: [
  //   'Garage',
  //   'Fireplace',
  // ],
  Garage: true,
  Swimming_Pool: false,
  Fireplace: true,
  Guest_House: false,
  image: './img/house_2.jpg'
}, {
  homeType: 'Townhomes',
  address: '745 Granada Ave',
  city: 'Brentwood',
  state: 'CA',
  bedroom: 3,
  bathroom: 3,
  price: 785000,
  squareFeet: 2825,
  lotSize: 3824,
  // features: [
  //   'Garage',
  //   'Swimming Pool'
  // ],
  Garage: true,
  Swimming_Pool: true,
  Fireplace: false,
  Guest_House: false,
  image: './img/house_3.jpg'
}, {
  homeType: 'Houses',
  address: '2113 Park Pl',
  city: 'Hollywood',
  state: 'CA',
  bedroom: 4,
  bathroom: 4,
  price: 885000,
  squareFeet: 3815,
  lotSize: 4798,
  // features: [
  //   'Garage',
  //   'Swimming Pool',
  //   'Fireplace'
  // ],
  Garage: true,
  Swimming_Pool: true,
  Fireplace: true,
  Guest_House: false,
  image: './img/house_4.jpg'
}, {
  homeType: 'Condos',
  address: '638 Hollints Ct',
  city: 'Downey',
  state: 'CA',
  bedroom: 2,
  bathroom: 2,
  price: 620000,
  squareFeet: 2815,
  lotSize: 4035,
  // features: [
  //   'Garage',
  //   'Fireplace'
  // ],
  Garage: true,
  Swimming_Pool: false,
  Fireplace: true,
  Guest_House: false,
  image: './img/house_5.jpg'
}, {
  homeType: 'Houses',
  address: '854 Summit Dr',
  city: 'Beverly Hills',
  state: 'CA',
  bedroom: 4,
  bathroom: 3,
  price: 970000,
  squareFeet: 4316,
  lotSize: 6295,
  // features: [
  //   'Garage',
  //   'Swimming Pool',
  //   'Fireplace',
  //   'Guest House'
  // ],
  Garage: true,
  Swimming_Pool: true,
  Fireplace: true,
  Guest_House: true,
  image: './img/house_6.jpg'
}, {
  homeType: 'Townhomes',
  address: '9821 Crossroads Blvd',
  city: 'Malibu',
  state: 'CA',
  bedroom: 3,
  bathroom: 2,
  price: 690000,
  squareFeet: 3305,
  lotSize: 4485,
  // features: [
  //   'Garage',
  //   'Swimming Pool',
  //   'Fireplace',
  // ],
  Garage: true,
  Swimming_Pool: true,
  Fireplace: true,
  Guest_House: false,
  image: './img/house_7.jpg'
}, {
  homeType: 'Houses',
  address: '341 Bright Way',
  city: 'Brentwood',
  state: 'CA',
  bedroom: 3,
  bathroom: 2,
  price: 590000,
  squareFeet: 3214,
  lotSize: 4572,
  // features: [
  //   'Garage',
  //   'Fireplace'
  // ],
  Garage: true,
  Swimming_Pool: false,
  Fireplace: true,
  Guest_House: false,
  image: './img/house_8.jpg'
}, {
  homeType: 'Condos',
  address: '536 Stormy St',
  city: 'Santa Monica',
  state: 'CA',
  bedroom: 4,
  bathroom: 2,
  price: 770000,
  squareFeet: 3475,
  lotSize: 4622,
  // features: [
  //   'Garage',
  //   'Swimming Pool',
  //   'Fireplace'
  // ],
  Garage: true,
  Swimming_Pool: true,
  Fireplace: true,
  Guest_House: false,
  image: './img/house_9.jpg'
}];

exports.default = listingsData;

// END

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(33);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Header = __webpack_require__(98);

var _Header2 = _interopRequireDefault(_Header);

var _Filter = __webpack_require__(97);

var _Filter2 = _interopRequireDefault(_Filter);

var _Listings = __webpack_require__(99);

var _Listings2 = _interopRequireDefault(_Listings);

var _listingsData = __webpack_require__(100);

var _listingsData2 = _interopRequireDefault(_listingsData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Filter items with text fields

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      name: 'bern',
      listingsData: _listingsData2.default,
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
      filteredData: _listingsData2.default,
      populateFormsData: '',
      sort_by: 'price-dsc',
      view: 'box',
      search: ''
    };

    _this.change = _this.change.bind(_this);
    _this.filteredData = _this.filteredData.bind(_this);
    _this.populateForms = _this.populateForms.bind(_this);
    _this.changeView = _this.changeView.bind(_this);

    return _this;
  }

  _createClass(App, [{
    key: 'componentWillMount',
    value: function componentWillMount() {

      var listingsData = this.state.listingsData.sort(function (a, b) {
        return a.price - b.price;
      });

      this.setState({
        listingsData: listingsData
      });
    }

    // method for filter

  }, {
    key: 'change',
    value: function change(event) {
      var _this2 = this;

      var name = event.target.name;
      var value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

      this.setState(_defineProperty({}, name, value), function () {
        console.log(_this2.state.min_price);

        // call method to check input limits
        // this.checkInputLimits()

        _this2.filteredData();
      });
      // test for target value
      // console.log(event.target.value)
    }
  }, {
    key: 'changeView',
    value: function changeView(viewName) {
      this.setState({
        view: viewName
      });
    }

    // method for filtering data

  }, {
    key: 'filteredData',
    value: function filteredData() {
      var _this3 = this;

      var newData = this.state.listingsData.filter(function (item) {

        return item.price >= _this3.state.min_price && item.price <= _this3.state.max_price && item.squareFeet >= _this3.state.min_squareFeet && item.squareFeet <= _this3.state.max_squareFeet && item.lotSize >= _this3.state.min_lotSize && item.lotSize <= _this3.state.max_lotSize && item.bedroom >= _this3.state.bedroom && item.bathroom >= _this3.state.bathroom;
      });

      if (this.state.city != "all") {
        newData = newData.filter(function (item) {
          return item.city == _this3.state.city;
        });
      }

      if (this.state.homeType != "all") {
        newData = newData.filter(function (item) {
          return item.homeType == _this3.state.homeType;
        });
      }

      if (this.state.sort_by == 'price-dsc') {
        newData = newData.sort(function (a, b) {
          return a.price - b.price;
        });
      }

      if (this.state.sort_by == 'price-asc') {
        newData = newData.sort(function (a, b) {
          return b.price - a.price;
        });
      }

      // search if statement
      if (this.state.search != '') {
        newData = newData.filter(function (item) {
          var city = item.city.toLowerCase();
          var searchText = _this3.state.search.toLowerCase();
          var n = city.match(searchText);

          if (n != null) {
            return true;
          }
        });
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

      if (this.state.Garage == true) {
        newData = newData.filter(function (item) {
          return item.Garage == true;
        });
      }

      if (this.state.Swimming_Pool == true) {
        newData = newData.filter(function (item) {
          return item.Swimming_Pool == true;
        });
      }

      if (this.state.Fireplace == true) {
        newData = newData.filter(function (item) {
          return item.Fireplace == true;
        });
      }

      if (this.state.Guest_House == true) {
        newData = newData.filter(function (item) {
          return item.Guest_House == true;
        });
      }

      this.setState({
        filteredData: newData
      });
    }
  }, {
    key: 'populateForms',
    value: function populateForms() {
      var _this4 = this;

      // city
      var cities = this.state.listingsData.map(function (item) {
        return item.city;
      });
      cities = new Set(cities);
      // spread operator array
      cities = [].concat(_toConsumableArray(cities));

      // sort the data
      cities = cities.sort();

      // homeType
      var homeTypes = this.state.listingsData.map(function (item) {
        return item.homeType;
      });
      homeTypes = new Set(homeTypes);
      homeTypes = [].concat(_toConsumableArray(homeTypes));

      // sort the data
      homeTypes = homeTypes.sort();

      // bedroom
      var bedrooms = this.state.listingsData.map(function (item) {
        return item.bedroom;
      });
      bedrooms = new Set(bedrooms);
      bedrooms = [].concat(_toConsumableArray(bedrooms));

      // sort the data
      bedrooms = bedrooms.sort();

      // bathroom
      var bathrooms = this.state.listingsData.map(function (item) {
        return item.bathroom;
      });
      bathrooms = new Set(bathrooms);
      bathrooms = [].concat(_toConsumableArray(bathrooms));

      // sort the data
      bathrooms = bathrooms.sort();

      this.setState({
        populateFormsData: {
          cities: cities,
          homeTypes: homeTypes,
          bedrooms: bedrooms,
          bathrooms: bathrooms
        }
      }, function () {
        console.log(_this4.state);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'whole-screen' },
        _react2.default.createElement(_Header2.default, null),
        _react2.default.createElement(
          'section',
          { id: 'content-area' },
          _react2.default.createElement(_Filter2.default, { change: this.change, globalState: this.state, populateAction: this.populateForms }),
          _react2.default.createElement(_Listings2.default, { listingsData: this.state.filteredData, change: this.change, globalState: this.state, changeView: this.changeView })
        )
      );
    }
  }]);

  return App;
}(_react.Component);

var app = document.getElementById('app');

_reactDom2.default.render(_react2.default.createElement(App, null), app);

/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filter = function (_Component) {
  _inherits(Filter, _Component);

  function Filter() {
    _classCallCheck(this, Filter);

    var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this));

    _this.state = {
      name: 'bern'
    };
    _this.cities = _this.cities.bind(_this);
    _this.homeTypes = _this.homeTypes.bind(_this);
    _this.bedrooms = _this.bedrooms.bind(_this);
    _this.bathrooms = _this.bathrooms.bind(_this);
    return _this;
  }

  _createClass(Filter, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.populateAction();
    }
  }, {
    key: 'cities',
    value: function cities() {
      if (this.props.globalState.populateFormsData.cities != undefined) {
        // means var = this.props.globalState.populateFormsData.cities
        var cities = this.props.globalState.populateFormsData.cities;

        // console.log(cities)

        return cities.map(function (item) {
          return _react2.default.createElement(
            'option',
            { key: item, value: item },
            item
          );
        });
      }
    }
  }, {
    key: 'homeTypes',
    value: function homeTypes() {
      if (this.props.globalState.populateFormsData.homeTypes != undefined) {
        // means var = this.props.globalState.populateFormsData.homeTypes
        var homeTypes = this.props.globalState.populateFormsData.homeTypes;

        // console.log(homeTypes)

        return homeTypes.map(function (item) {
          return _react2.default.createElement(
            'option',
            { key: item, value: item },
            item
          );
        });
      }
    }
  }, {
    key: 'bedrooms',
    value: function bedrooms() {
      if (this.props.globalState.populateFormsData.bedrooms != undefined) {
        // means var = this.props.globalState.populateFormsData.bedrooms
        var bedrooms = this.props.globalState.populateFormsData.bedrooms;

        // console.log(bedrooms)

        return bedrooms.map(function (item) {
          return _react2.default.createElement(
            'option',
            { key: item, value: item },
            item,
            '+ Bedrooms'
          );
        });
      }
    }
  }, {
    key: 'bathrooms',
    value: function bathrooms() {
      if (this.props.globalState.populateFormsData.bathrooms != undefined) {
        // means var = this.props.globalState.populateFormsData.cities
        var bathrooms = this.props.globalState.populateFormsData.bathrooms;

        // console.log(bathrooms)

        return bathrooms.map(function (item) {
          return _react2.default.createElement(
            'option',
            { key: item, value: item },
            item,
            '+ Bathrooms'
          );
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { id: 'filter' },
        _react2.default.createElement(
          'div',
          { className: 'inside' },
          _react2.default.createElement(
            'h4',
            null,
            'Filter'
          ),
          _react2.default.createElement(
            'select',
            { name: 'city', className: 'filters city', onChange: this.props.change },
            _react2.default.createElement(
              'option',
              { value: 'all' },
              'All Cities'
            ),
            this.cities()
          ),
          _react2.default.createElement(
            'select',
            { name: 'homeType', className: 'filters homeType', onChange: this.props.change },
            _react2.default.createElement(
              'option',
              { value: 'all' },
              'All Home Types'
            ),
            this.homeTypes()
          ),
          _react2.default.createElement(
            'select',
            { name: 'bedroom', className: 'filters bedroom', onChange: this.props.change },
            _react2.default.createElement(
              'option',
              { value: '0' },
              '0+ Bedrooms'
            ),
            this.bedrooms()
          ),
          _react2.default.createElement(
            'select',
            { name: 'bathroom', className: 'filters bathroom', onChange: this.props.change },
            _react2.default.createElement(
              'option',
              { value: '0' },
              '0+ Bathrooms'
            ),
            this.bathrooms()
          ),
          _react2.default.createElement(
            'div',
            { className: 'filters price', onChange: this.props.change },
            _react2.default.createElement(
              'span',
              { className: 'title' },
              'Price'
            ),
            _react2.default.createElement('input', { type: 'number', pattern: '[0-9]*', inputMode: 'numeric', min: '0', max: '1000000', step: '100000', name: 'min_price', className: 'min-price', onChange: this.props.change, value: this.props.globalState.min_price }),
            _react2.default.createElement('input', { type: 'number', pattern: '[0-9]*', inputMode: 'numeric', min: '0', max: '1000000', step: '100000', name: 'max_price', className: 'max-price', onChange: this.props.change, value: this.props.globalState.max_price })
          ),
          _react2.default.createElement(
            'div',
            { className: 'filters squareFeet' },
            _react2.default.createElement(
              'span',
              { className: 'title' },
              'Square Feet'
            ),
            _react2.default.createElement('input', { type: 'number', pattern: '[0-9]*', inputMode: 'numeric', min: '0', max: '10000', step: '100', name: 'min_squareFeet', className: 'min-squareFeet', onChange: this.props.change, value: this.props.globalState.min_squareFeet }),
            _react2.default.createElement('input', { type: 'number', pattern: '[0-9]*', inputMode: 'numeric', min: '0', max: '10000', step: '100', name: 'max_squareFeet', className: 'max-squareFeet', onChange: this.props.change, value: this.props.globalState.max_squareFeet })
          ),
          _react2.default.createElement(
            'div',
            { className: 'filters lotSize' },
            _react2.default.createElement(
              'span',
              { className: 'title' },
              'Lot Size'
            ),
            _react2.default.createElement('input', { type: 'number', pattern: '[0-9]*', inputMode: 'numeric', min: '0', max: '50000', step: '1000', name: 'min_lotSize', className: 'min-lotSize', onChange: this.props.change, value: this.props.globalState.min_lotSize }),
            _react2.default.createElement('input', { type: 'number', pattern: '[0-9]*', inputMode: 'numeric', min: '0', max: '50000', step: '1000', name: 'max_lotSize', className: 'max-lotSize', onChange: this.props.change, value: this.props.globalState.max_lotSize })
          ),
          _react2.default.createElement(
            'div',
            { className: 'filters features' },
            _react2.default.createElement(
              'span',
              { className: 'title' },
              'Features'
            ),
            _react2.default.createElement(
              'label',
              { htmlFor: 'features' },
              _react2.default.createElement(
                'span',
                null,
                'Garage'
              ),
              _react2.default.createElement('input', { name: 'Garage', value: 'Garage', type: 'checkbox', onChange: this.props.change })
            ),
            _react2.default.createElement(
              'label',
              { htmlFor: 'features' },
              _react2.default.createElement(
                'span',
                null,
                'Swimming Pool'
              ),
              _react2.default.createElement('input', { name: 'Swimming_Pool', value: 'Swimming_Pool', type: 'checkbox', onChange: this.props.change })
            ),
            _react2.default.createElement(
              'label',
              { htmlFor: 'features' },
              _react2.default.createElement(
                'span',
                null,
                'Fireplace'
              ),
              _react2.default.createElement('input', { name: 'Fireplace', value: 'Fireplace', type: 'checkbox', onChange: this.props.change })
            ),
            _react2.default.createElement(
              'label',
              { htmlFor: 'features' },
              _react2.default.createElement(
                'span',
                null,
                'Guest House'
              ),
              _react2.default.createElement('input', { name: 'Guest_House', value: 'Guest_House', type: 'checkbox', onChange: this.props.change })
            )
          )
        )
      );
    }
  }]);

  return Filter;
}(_react.Component);

exports.default = Filter;

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));

    _this.state = {
      name: 'bern'
    };
    return _this;
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'header',
        null,
        _react2.default.createElement(
          'div',
          { className: 'logo' },
          _react2.default.createElement(
            'span',
            null,
            'bern'
          ),
          'Estates'
        ),
        _react2.default.createElement(
          'nav',
          null,
          _react2.default.createElement(
            'a',
            { href: '#' },
            'Create Ads'
          ),
          _react2.default.createElement(
            'a',
            { href: '#' },
            'About Us'
          ),
          _react2.default.createElement(
            'a',
            { href: '#' },
            'Log In'
          ),
          _react2.default.createElement(
            'a',
            { href: '#', className: 'register-btn' },
            'Register'
          )
        )
      );
    }
  }]);

  return Header;
}(_react.Component);

exports.default = Header;

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Listings = function (_Component) {
  _inherits(Listings, _Component);

  function Listings() {
    _classCallCheck(this, Listings);

    var _this = _possibleConstructorReturn(this, (Listings.__proto__ || Object.getPrototypeOf(Listings)).call(this));

    _this.state = {
      name: 'bern'
    };
    _this.loopListings = _this.loopListings.bind(_this);
    return _this;
  }

  _createClass(Listings, [{
    key: 'loopListings',
    value: function loopListings() {
      var _this2 = this;

      // alternate syntax for declaring variable
      // var data = this.props.listingsData

      var listingsData = this.props.listingsData;

      // if statement for listingsData

      if (listingsData == undefined || listingsData.length == 0) {
        return "Sorry your filter did not mach any listing.";
      }

      // passing the index for each child in the array
      return listingsData.map(function (listing, index) {
        // box view if statement
        if (_this2.props.globalState.view == 'box') {

          // THIS IS THE Box VIEW
          return _react2.default.createElement(
            'div',
            { className: 'col-md-3-listing col-md-4', key: index },
            _react2.default.createElement(
              'div',
              { className: 'listing' },
              _react2.default.createElement(
                'div',
                { className: 'listing-img', style: { background: 'url("' + listing.image + '") center center no-repeat' } },
                _react2.default.createElement(
                  'span',
                  { className: 'address' },
                  listing.address
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'details' },
                  _react2.default.createElement(
                    'div',
                    { className: 'col-md-3' },
                    _react2.default.createElement('div', { className: 'user-img' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'col-md-9' },
                    _react2.default.createElement(
                      'div',
                      { className: 'user-details' },
                      _react2.default.createElement(
                        'span',
                        { className: 'user-name' },
                        'Hector Bernal'
                      ),
                      _react2.default.createElement(
                        'span',
                        { className: 'post-date' },
                        '06/12/2018'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'listing-details' },
                      _react2.default.createElement(
                        'div',
                        { className: 'squareFeet' },
                        _react2.default.createElement('i', { className: 'fa fa-square-o', 'aria-hidden': 'true' }),
                        _react2.default.createElement(
                          'span',
                          null,
                          listing.squareFeet,
                          ' ft\xB2'
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'bedrooms' },
                        _react2.default.createElement('i', { className: 'fa fa-bed', 'aria-hidden': 'true' }),
                        _react2.default.createElement(
                          'span',
                          null,
                          listing.bedroom,
                          ' Bedrooms'
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'view-btn' },
                      'View Listing'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'bottom-info' },
                _react2.default.createElement(
                  'span',
                  { className: 'price' },
                  '$',
                  listing.price
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'location' },
                  _react2.default.createElement('i', { className: 'fa fa-map-marker', 'aria-hidden': 'true' }),
                  listing.city,
                  ', ',
                  listing.state
                )
              )
            )
          );
        } else {
          // THIS IS THE Long VIEW
          // created a key for each child in the array
          return _react2.default.createElement(
            'div',
            { className: 'col-md-12-listing col-lg-6', key: index },
            _react2.default.createElement(
              'div',
              { className: 'listing' },
              _react2.default.createElement(
                'div',
                { className: 'listing-img', style: { background: 'url("' + listing.image + '") center center no-repeat' } },
                _react2.default.createElement(
                  'span',
                  { className: 'address' },
                  listing.address
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'details' },
                  _react2.default.createElement(
                    'div',
                    { className: 'col-md-3' },
                    _react2.default.createElement('div', { className: 'user-img' })
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'col-md-9' },
                    _react2.default.createElement(
                      'div',
                      { className: 'user-details' },
                      _react2.default.createElement(
                        'span',
                        { className: 'user-name' },
                        'Hector Bernal'
                      ),
                      _react2.default.createElement(
                        'span',
                        { className: 'post-date' },
                        '06/12/2018'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'listing-details' },
                      _react2.default.createElement(
                        'div',
                        { className: 'squareFeet' },
                        _react2.default.createElement('i', { className: 'fa fa-square-o', 'aria-hidden': 'true' }),
                        _react2.default.createElement(
                          'span',
                          null,
                          listing.squareFeet,
                          ' ft\xB2'
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'bedrooms' },
                        _react2.default.createElement('i', { className: 'fa fa-bed', 'aria-hidden': 'true' }),
                        _react2.default.createElement(
                          'span',
                          null,
                          listing.bedroom,
                          ' Bedrooms'
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'view-btn' },
                      'View Listing'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'bottom-info' },
                _react2.default.createElement(
                  'span',
                  { className: 'price' },
                  '$',
                  listing.price
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'location' },
                  _react2.default.createElement('i', { className: 'fa fa-map-marker', 'aria-hidden': 'true' }),
                  listing.city,
                  ', ',
                  listing.state
                )
              )
            )
          );
        } // end of view
      }); // end of listingsData.map
    } // end of loopListings()

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'section',
        { id: 'listings' },
        _react2.default.createElement(
          'section',
          { className: 'search-area' },
          _react2.default.createElement('input', { type: 'text', name: 'search', onChange: this.props.change })
        ),
        _react2.default.createElement(
          'section',
          { className: 'sort_by-area' },
          _react2.default.createElement(
            'div',
            { className: 'results' },
            this.props.globalState.filteredData.length,
            ' results found'
          ),
          _react2.default.createElement(
            'div',
            { className: 'sort-options' },
            _react2.default.createElement(
              'select',
              { name: 'sort_by', className: 'sort_by', onChange: this.props.change },
              _react2.default.createElement(
                'option',
                { value: 'price-dsc' },
                'Lowest Price'
              ),
              _react2.default.createElement(
                'option',
                { value: 'price-asc' },
                'Highest Price'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'view' },
              _react2.default.createElement('i', { className: 'fa fa-th-list', 'aria-hidden': 'true', onClick: this.props.changeView.bind(null, "long") }),
              _react2.default.createElement('i', { className: 'fa fa-th', 'aria-hidden': 'true', onClick: this.props.changeView.bind(null, "box") })
            )
          )
        ),
        _react2.default.createElement(
          'section',
          { className: 'listings-results' },
          this.loopListings()
        ),
        _react2.default.createElement(
          'section',
          { id: 'pagination' },
          _react2.default.createElement(
            'ul',
            { className: 'pages' },
            _react2.default.createElement(
              'li',
              null,
              'Prev'
            ),
            _react2.default.createElement(
              'li',
              { className: 'active' },
              '1'
            ),
            _react2.default.createElement(
              'li',
              null,
              '2'
            ),
            _react2.default.createElement(
              'li',
              null,
              '3'
            ),
            _react2.default.createElement(
              'li',
              null,
              '4'
            ),
            _react2.default.createElement(
              'li',
              null,
              '5'
            ),
            _react2.default.createElement(
              'li',
              null,
              '6'
            ),
            _react2.default.createElement(
              'li',
              null,
              '7'
            ),
            _react2.default.createElement(
              'li',
              null,
              '8'
            ),
            _react2.default.createElement(
              'li',
              null,
              '9'
            ),
            _react2.default.createElement(
              'li',
              null,
              '10'
            ),
            _react2.default.createElement(
              'li',
              null,
              'Next'
            )
          )
        )
      );
    }
  }]);

  return Listings;
}(_react.Component);

exports.default = Listings;

/***/ })

},[102]);