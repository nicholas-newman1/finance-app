import React, { useState, useEffect } from 'react';
import '../../css/searchResults/searchFilter.css';

const SearchResultsFilter = ({ setExchange }) => {
  const [checked, setChecked] = useState('');

  const exchanges = [
    'ETF',
    'MUTUAL_FUND',
    'COMMODITY',
    'INDEX',
    'CRYPTO',
    'FOREX',
    'TSX',
    'AMEX',
    'NASDAQ',
    'NYSE',
    'EURONEXT',
  ];

  return (
    <div className='search-filter-container'>
      <h2 className='search-filter-header'>Filter Results</h2>
      <form
        className='search-filter-form'
        onSubmit={(e) => {
          e.preventDefault();
          setExchange(checked);
        }}
      >
        <div className='search-filter-inputs'>
          {exchanges.map((exchange, i) => (
            <label className='search-filter-label' key={i}>
              <input
                className='search-filter-input'
                type='checkbox'
                value={exchange}
                checked={checked === exchange}
                onChange={() =>
                  setChecked(checked === exchange ? '' : exchange)
                }
              />
              {exchange}
            </label>
          ))}
        </div>

        <button className='search-filter-btn' type='submit'>
          Filter
        </button>
      </form>
    </div>
  );
};

export default SearchResultsFilter;