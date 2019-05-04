import React, {Suspense} from 'react';
import {hot} from 'react-hot-loader';
import {Helmet} from "react-helmet";
import {BrowserRouter as Router, Route, Switch, Redirect,} from 'react-router-dom';
import {Provider} from '@fallingsnow/react-contextual';

import * as Pages from './pages';
import {Navbar, Footer, LoadingAnimation,} from './components';
import {Account} from './contexts';

const LoadingScreen = (<div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }}><LoadingAnimation/></div>);

function PrivateRoute({
    component: Component,
    ...rest
}) {
    return (<Route {...rest} render={props => window.authenticated
            ? (<Component computedMatch={rest.computedMatch} socket={rest.socket} {...props}/>)
            : (<Redirect to={{
                    pathname: "/login",
                    state: {
                        from: props.location
                    },
                }}/>)}/>);
}

const App = () => (<Provider store={Account}>
    <Router>
        <div id="app" css={{
                display: 'flex',
                height: '100%',
                overflow: 'hidden',
                flexDirection: 'column',
                color: '#333',
                fontFamily: 'Roboto',
                'input' : {
                    color: 'inherit',
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    ':invalid': {
                        // boxShadow: `0 1px 0 0 ${Colors.lightRed}`
                    },
                },
            }}>
            <Helmet>
                <title>Tuffy Estates</title>
            </Helmet>
            <Navbar/>
            <div css={{
                    flex: 1,
                    backgroundColor: '#FAFAFA',
                    overflow: 'auto',
                    paddingTop: '1em',
                }}>
                <Suspense fallback={LoadingScreen}>
                    <Switch>
                        <Route exact={true} path="/" component={Pages.Home}/>
                        <PrivateRoute path="/properties/create" component={Pages.CreateProperty}/>
                        <PrivateRoute path="/properties/edit/:id" component={Pages.Property}/>
                        <Route path="/properties/:id" component={Pages.Property}/>
                        <Route path="/properties" component={Pages.Properties}/>
                        <Route path="/register" component={Pages.Register}/>
                        <Route path="/blog" component={Pages.Blog}/>
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
