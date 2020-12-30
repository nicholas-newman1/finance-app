import React from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './pages/homePage/HomePage';
import QuotePage from './pages/QuotePage';
import SearchResultsPage from './pages/searchResultsPage/SearchResultsPage';
import IndexPage from './pages/IndexPage';
import StockPage from './pages/stockPage/StockPage';
import CryptoPage from './pages/CryptoPage';
import CommodityPage from './pages/CommodityPage';
import ForexPage from './pages/ForexPage';
import WatchlistPage from './pages/WatchlistPage';
import Footer from './components/footer/Footer';
import { QuoteProvider } from './context/QuoteContext';
import { RealDataProvider } from './context/RealDataContext';
import { DisplayNavProvider } from './context/DisplayNavContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  return (
    <HelmetProvider>
      <WatchlistProvider>
        <RealDataProvider>
          <QuoteProvider>
            <DisplayNavProvider>
              <Router>
                <Header />
                <main>
                  <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route
                      exact
                      path='/search/:query'
                      component={SearchResultsPage}
                    />
                    <Route exact path='/quote/:symbol' component={QuotePage} />
                    <Route exact path='/indexes' component={IndexPage} />
                    <Route exact path='/stocks' component={StockPage} />
                    <Route
                      exact
                      path='/cryptocurrencies'
                      component={CryptoPage}
                    />
                    <Route exact path='/forex' component={ForexPage} />
                    <Route
                      exact
                      path='/commodities'
                      component={CommodityPage}
                    />
                    <Route exact path='/watchlist' component={WatchlistPage} />
                    <Redirect from='/quote/:symbol/**' to='/quote/:symbol' />
                    <Redirect from='/:page/**' to='/:page' />
                    <Redirect from='/**' to='/' />
                  </Switch>
                </main>
                <Footer />
              </Router>
            </DisplayNavProvider>
          </QuoteProvider>
        </RealDataProvider>
      </WatchlistProvider>
    </HelmetProvider>
  );
};

export default App;
