import React, {Suspense} from 'react';
import {hot} from 'react-hot-loader';
import {Helmet} from "react-helmet";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import * as Pages from './pages';
import {Navbar, Footer} from './components';
import {Account} from './contexts';
import {Provider} from 'react-contextual';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faLock, faUser, faHome, faHandHoldingUsd, faSearch} from '@fortawesome/free-solid-svg-icons';
/** @jsx jsx */
import {jsx} from '@emotion/core';

library.add(faLock, faUser, faHome, faHandHoldingUsd, faSearch);
const App = () => (<Provider store={Account}>
    <Router>
        <div id="app" css={{
                display: 'flex',
                height: '100%',
                overflow: 'hidden',
                flexDirection: 'column',
                color: '#333'
            }}>
            <Helmet>
                <title>Tuffy Estates</title>
            </Helmet>
            <Navbar/>
            <div css={{
                    flex: 1,
                    backgroundColor: '#FAFAFA',
                    overflow: 'auto'
                }}>
                <Suspense fallback={(<div></div>)}>
                    <Switch>
                        <Route exact={true} path="/" component={Pages.Home}/>
                        <Route path="/properties/:id" component={Pages.Property}/>
                        <Route path="/properties" component={Pages.Properties}/>
                        <Route path="/register" component={Pages.Register}/>
                        <Route path="/login" component={Pages.Login}/>
                        <Route path="/api" component={Pages.API}/>
                        <Route path="/docs" component={Pages.Docs}/>
                        <Route component={Pages.FourOFour}/>
                    </Switch>
                </Suspense>
            </div>
            <Footer/>
        </div>
    </Router>
</Provider>);

export default hot(module)(App);
