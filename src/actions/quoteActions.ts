import { fetchFromAPI } from '../utils/api';
import {
  FetchQuoteRequest,
  FetchQuoteSuccess,
  FetchQuoteFailure,
  FetchQuoteNewsRequest,
  FetchQuoteNewsSuccess,
  FetchQuoteNewsFailure,
} from '../types/actionTypes';
import { NewsItem, Quote } from '../types/APITypes';
import { Dispatch } from 'redux';
import { AppState } from '../reducers/rootReducer';
import { AppActions } from '../types/actionTypes';
import { isStock } from '../utils/helpers';

const fetchQuoteRequest = (): FetchQuoteRequest => ({
  type: 'FETCH_QUOTE_REQUEST',
});

const fetchQuoteSuccess = (data: Quote[]): FetchQuoteSuccess => ({
  type: 'FETCH_QUOTE_SUCCESS',
  payload: data,
});

const fetchQuoteFailure = (error: string): FetchQuoteFailure => ({
  type: 'FETCH_QUOTE_FAILURE',
  payload: error,
});

const fetchQuoteNewsRequest = (): FetchQuoteNewsRequest => ({
  type: 'FETCH_QUOTE_NEWS_REQUEST',
});

const fetchQuoteNewsSuccess = (data: NewsItem[]): FetchQuoteNewsSuccess => ({
  type: 'FETCH_QUOTE_NEWS_SUCCESS',
  payload: data,
});

const fetchQuoteNewsFailure = (error: string): FetchQuoteNewsFailure => ({
  type: 'FETCH_QUOTE_NEWS_FAILURE',
  payload: error,
});

export const fetchQuote = (symbol: string) => {
  return fetchFromAPI(
    `quote/${symbol}`,
    'quote',
    fetchQuoteRequest,
    fetchQuoteSuccess,
    fetchQuoteFailure
  );
};

export const fetchQuoteNews = (symbol = '') => {
  return fetchFromAPI(
    'stock_news',
    'news',
    fetchQuoteNewsRequest,
    fetchQuoteNewsSuccess,
    fetchQuoteNewsFailure,
    {
      params:
        symbol === ''
          ? 'limit=10&tickers=AAPL,FB,AMZN,TSLA'
          : `limit=10&tickers=${symbol}`,
    }
  );
};

export const fetchQuoteAndQuoteNews = (symbol: string) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    // @ts-ignore
    return dispatch(fetchQuote(symbol)).then(() => {
      return isStock(getState().quote.quoteData.data[0].exchange)
        ? // @ts-ignore
          dispatch(fetchQuoteNews(symbol))
        : // @ts-ignore
          dispatch(fetchQuoteNews());
    });
  };
};