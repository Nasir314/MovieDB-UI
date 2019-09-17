/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Home from '../Home/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Login from '../Login/Loadable';
import MyWatchList from '../MyWatchList/Loadable'
import ViewMore from '../ViewMore/Loadable';
import GlobalStyle from '../../global-styles';

const checkAuth = () => {
  const token = localStorage.getItem('token');
  return token;
};

const AuthRoute1 = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (  
    !checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/' }} />
      )
  )}
  />
);

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    )}
  />
);

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute1 path="/login" component={Login} />
        <AuthRoute exact path="/" component={Home} />
        <AuthRoute path="/my-watch-list" component={MyWatchList} />
        <AuthRoute path="/view-more" component={ViewMore} />
        <AuthRoute component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
