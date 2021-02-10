import React from 'react';
import { Link } from 'react-router-dom';
import './searchResult.css';

interface Props {
  result: SearchResult;
  isInWatchlist: boolean;
  addToWatchlist: () => void;
  removeFromWatchlist: () => void;
}

const SearchResult: React.FC<Props> = ({
  result,
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
}) => {
  const { symbol, name, exchangeShortName } = result;

  return (
    <li className='search-result' key={symbol}>
      <div className='search-result__content'>
        <h2 className='search-result__heading'>
          <Link className='search-result__link' to={`/quote/${symbol}`}>
            {symbol} ({exchangeShortName})
          </Link>
        </h2>
        <p className='search-result__desc'>{name}</p>
      </div>
      <div className='search-result__btns-container'>
        <Link className='btn-blue' to={`/quote/${symbol}`}>
          View Quote
        </Link>{' '}
        <button
          className='btn-outline-blue'
          onClick={() =>
            isInWatchlist ? removeFromWatchlist() : addToWatchlist()
          }
        >
          {isInWatchlist ? 'Remove From Watchlist' : 'Add to Watchlist'}
        </button>
      </div>
    </li>
  );
};

export default SearchResult;
