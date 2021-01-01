import React from 'react';
import { Helmet } from 'react-helmet-async';
import BottomNews from '../../components/bottomNews/BottomNews';
import Heading from '../../components/heading/Heading';
import StockTable from '../../components/stockTable/StockTable';
import SectorTable from '../../components/sectorTable/SectorTable';
import {
  dummyActivesData,
  dummyGainersData,
  dummyLosersData,
} from '../../dummyData';

import './stockPage.css';
import useFetch from '../../hooks/useFetch';
import useScrollTop from '../../hooks/useScrollTop';

const StockPage: React.FC = () => {
  const { data: activesData, loading: activesLoading } = useFetch(
    [], // initial value
    'actives', // endpoint
    dummyActivesData // dummy data
  );

  const { data: gainersData, loading: gainersLoading } = useFetch(
    [],
    'gainers',
    dummyGainersData
  );

  const { data: losersData, loading: losersLoading } = useFetch(
    [],
    'losers',
    dummyLosersData
  );

  useScrollTop(); // scrolls to top of page on component mount

  return (
    <div className='stock-page'>
      <Helmet>
        <title>Stock Quotes | Finance App</title>
        <meta
          name='description'
          content='Free stock quotes. Find free stock quotes, forex rates, cryptocurrency prices, and more.'
        />
      </Helmet>

      <Heading text='Stocks' />

      <div className='stock-page__stocklists'>
        <div className='stock-page__stock-table'>
          <h2 className='stockpage__sub-heading'>Actives</h2>
          <StockTable data={activesData} loading={activesLoading} />
        </div>

        <div className='stock-page__stock-table'>
          <h2 className='stockpage__sub-heading'>Gainers</h2>
          <StockTable data={gainersData} loading={gainersLoading} />
        </div>

        <div className='stock-page__stock-table'>
          <h2 className='stockpage__sub-heading'>Losers</h2>
          <StockTable data={losersData} loading={losersLoading} />
        </div>
      </div>

      <div className='stock-page__sector-table'>
        <h2 className='stockpage__sub-heading'>Sectors</h2>
        <SectorTable />
      </div>

      <BottomNews />
    </div>
  );
};

export default StockPage;
