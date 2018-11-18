import React, {Suspense} from 'react';
import {hot} from 'react-hot-loader';
import {Helmet} from "react-helmet";
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-contextual';
/** @jsx jsx */
import {jsx} from '@emotion/core';

import * as Pages from './pages';
import {Navbar, Footer, LoadingAnimation} from './components';
import Colors from './colors';
import {Account} from './contexts';

const LoadingScreen = (<div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }}><LoadingAnimation/></div>);

const App = () => (<Provider store={Account}>
    <Router>
        <div id="app" css={{
                display: 'flex',
                height: '100%',
                overflow: 'hidden',
                flexDirection: 'column',
                color: '#333',
                'input' : {
                    color: 'inherit',
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    ':invalid': {
                        // boxShadow: `0 1px 0 0 ${Colors.lightRed}`
                    }
                }
            }}>
            <Helmet>
                <title>Tuffy Estates</title>
            </Helmet>
            <Navbar/>
            <div css={{
                    flex: 1,
                    backgroundColor: '#FAFAFA',
                    overflow: 'auto',
                    paddingTop: '1em'
                }}>
                <Suspense fallback={LoadingScreen}>
                    <Switch>
                        <Route exact={true} path="/" component={Pages.Home}/>
                        <Route path="/properties/create" component={Pages.CreateProperty}/>
                        <Route path="/properties/edit/:id" component={Pages.Property}/>
                        <Route path="/properties/:id" component={Pages.Property}/>
                        <Route path="/properties" component={Pages.Properties}/>
                        <Route path="/register" component={Pages.Register}/>
                        <Route path="/login" component={Pages.Login}/>
                        <Route path="/api" component={Pages.API}/>
                        <Route path="/docs" component={Pages.Docs}/>
                        <Route path="/logout" component={Pages.Logout}/>
                        <Route component={Pages.FourOFour}/>
                    </Switch>
                </Suspense>
            </div>
            <Footer/>
        </div>
    </Router>
</Provider>);

export default hot(module)(App);
