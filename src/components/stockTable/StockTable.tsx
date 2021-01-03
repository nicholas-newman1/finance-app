import React from 'react';
import LoadingStockList from './LoadingStockList';
import StockRow from './StockRow';
import './stockTable.css';

const StockList = ({ data, loading }) => {
  return (
    <table className='stock-table'>
      <thead className='stock-table__thead'>
        <tr className='stock-table__tr'>
          <th className='stock-table__th'>Symbol</th>
          <th className='stock-table__th'>Price</th>
          <th className='stock-table__th'>Change ($)</th>
          <th className='stock-table__th'>Change (%)</th>
        </tr>
      </thead>
      <tbody className='stock-table__tbody'>
        {loading ? (
          <LoadingStockList />
        ) : (
          data.map(
            (quote, i) => i < 4 && <StockRow key={quote.ticker} data={quote} />
          )
        )}
      </tbody>
    </table>
  );
};

export default StockList;