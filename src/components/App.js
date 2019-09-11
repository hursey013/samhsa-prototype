import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import withSizes from 'react-sizes';
import { Helmet } from 'react-helmet';

import content from '../utils/content';
import { SITE_TITLE } from '../utils/constants';
import { theme } from '../tailwind.js';

import ScreenContext from './ScreenContext';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import Home from './Home';
import Results from './Results';
import Details from './Details';
import Content from './Content';
import NoMatch from './NoMatch';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <ScreenContext.Provider value={this.props.isDesktop}>
        <Helmet
          titleTemplate={`%s | ${process.env.REACT_APP_SITE_TITLE}`}
          defaultTitle={process.env.REACT_APP_SITE_TITLE}
        />
        <GlobalStyle />
        <Header />
        <main role="main">
          <Switch>
            <Route exact path="/" render={() => <Home content={content()} />} />
            <Route path="/results" component={Results} />
            <Route path="/details/:frid" component={Details} />
            <Route
              path="/content/:sectionID/:subSectionID?"
              component={Content}
            />
            />
            <Route component={NoMatch} />
          </Switch>
        </main>
        <Footer />
      </ScreenContext.Provider>
    );
  }
}

App.propTypes = {
  isDesktop: PropTypes.bool.isRequired
};

const mapSizesToProps = ({ width }) => ({
  isDesktop: width > parseInt(theme.screens.lg, 10)
});

export default withSizes(mapSizesToProps)(App);
