import React from 'react';
import { Link } from 'react-router-dom';

const PriceRow = ({ data }) => {
  let { symbol, price, change, changesPercentage } = data;
  const color = change > 0 ? 'green' : '#de0e00';
  const isPositive = change > 0;

  let symbolText = symbol;
  if (symbol === '^DJI') symbolText = 'DJIA';
  if (symbol === '^GSPC') symbolText = 'S&P 500';
  if (symbol === '^GSPTSE') symbolText = 'S&P/TSX';
  if (symbol === '^IXIC') symbolText = 'NASDAQ';

  // number to represent how many decimals will be displayed
  let decimals = 2;

  // determine number of decimal places to display, depending on the maginitude of the change
  while (
    change &&
    (change.toLocaleString(undefined, {
      maximumFractionDigits: decimals,
    }) === '0' ||
      change.toLocaleString(undefined, {
        maximumFractionDigits: decimals,
      }) === '-0')
  ) {
    decimals++;
  }

  // limit change decimal places
  if (change) {
    change = change.toLocaleString(undefined, {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    });
  }

  // limit price decimal places
  if (price) {
    price = price.toLocaleString(undefined, {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    });
  }

  // limit changesPercentage decimal places
  if (changesPercentage) {
    changesPercentage = changesPercentage.toLocaleString(undefined, {
      maximumFractionDigits: decimals,
    });
  }

  return (
    <tr className='pricelist__tr'>
      <td className='pricelist__td'>
        <Link className='symbol-link' to={`/quote/${symbol}`}>
          {symbolText}
        </Link>
      </td>
      <td className='pricelist__td'>${price}</td>
      <td className='pricelist__td' style={{ color }}>
        {isPositive && '+'}
        {change}
      </td>
      <td className='pricelist__td' style={{ color }}>
        {isPositive && '+'}
        {changesPercentage}%
      </td>
    </tr>
  );
};

export default PriceRow;