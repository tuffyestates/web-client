import React from 'react';
import {hot} from 'react-hot-loader';
import {Helmet} from "react-helmet";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as Pages from './pages';
import {Navbar, Footer} from './components';

const App = () => (<Router>
    <div id="app" style={{display: 'flex', minHeight: '100%', flexDirection: 'column'}}>
        <Helmet>
            <title>Tuffy Estates</title>
            {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/></Helmet>*/}
        </Helmet>
        {/*<Route component={Pages.FourOFour}/>*/}
        <Navbar/>
        <div style={{flex: 1, backgroundColor: '#FAFAFA'}}>
            <Route exact path="/" component={Pages.Home}/>
            <Route path="/listings" component={Pages.Listings}/>
        </div>
        <Footer/>
    </div>
</Router>);

export default hot(module)(App);
