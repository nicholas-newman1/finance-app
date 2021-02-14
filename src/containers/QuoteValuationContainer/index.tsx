import React, { useEffect, useState } from 'react';
import QuoteValuation from '../../components/QuoteValuation';
import { formatValuationData } from './helpers';
import useFetch from '../../hooks/useFetch';
import {
  dummyQuarterlyValuationData,
  dummyAnnualValuationData,
} from '../../utils/dummyData';

interface Props {
  symbol: string;
}

const QuoteValuationContainer: React.FC<Props> = ({ symbol }) => {
  const [period, setPeriod] = useState<Period>('annual');
  const [tableData, setTableData] = useState<any[][]>([]);

  // custom hook fetches data
  const { data, loading } = useFetch(
    [], // intial value
    `key-metrics/${symbol}`, // endpoint
    period === 'quarter'
      ? dummyQuarterlyValuationData
      : dummyAnnualValuationData,
    `period=${period}`, // parameters
    [period] // dependencies
  );

  useEffect(() => {
    setTableData(formatValuationData(data, period));
    //eslint-disable-next-line
  }, [data]);

  return (
    <QuoteValuation
      tableData={tableData}
      loading={loading}
      setPeriod={setPeriod}
    />
  );
};

export default QuoteValuationContainer;