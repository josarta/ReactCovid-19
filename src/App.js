import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import componentQueries from 'react-component-queries';


import PageSpinner from './components/PageSpinner';
import GAListener from './components/GAListener';
import { MainLayout } from './components/Layout';

import store from "./redux/store";

import './styles/reduction.scss';


const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};


let persistor =persistStore(store)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPage} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
      </PersistGate>
      </Provider>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
