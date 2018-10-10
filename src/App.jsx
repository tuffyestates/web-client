import React from 'react';
import {hot} from 'react-hot-loader';
import {Helmet} from "react-helmet";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import * as Pages from './pages';
import {Navbar, Footer} from './components';
import {Account} from './contexts';
import {Subscribe, Provider} from 'react-contextual';

const App = () => (<Provider store={Account}>
    <Router>
        <div id="app" style={{
                display: 'flex',
                height: '100%',
                overflow: 'hidden',
                flexDirection: 'column'
            }}>
            <Helmet>
                <title>Tuffy Estates</title>
                {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/></Helmet>*/}
            </Helmet>
            {/* <Route component={Pages.FourOFour}/> */}
            <Navbar/>
            <div style={{
                    flex: 1,
                    backgroundColor: '#FAFAFA',
                    overflow: 'auto'
                }}>
                <Switch>
                    <Route exact={true} path="/" component={Pages.Home}/>
                    <Route path="/listings" component={Pages.Listings}/>
                    <Route path="/listing/:id" component={Pages.Listing}/>
                    <Route path="/register">
                        <Subscribe to={Account}>
                            {account => <Pages.Register account={account}/>}
                        </Subscribe>
                    </Route>
                    <Route path="/login">
                        <Subscribe to={Account}>
                            {account => <Pages.Login account={account}/>}
                        </Subscribe>
                    </Route>
                    <Route path="/api" component={Pages.API}/>
                </Switch>
            </div>
            <Footer/>
        </div>
    </Router>
</Provider>);

export default hot(module)(App);
