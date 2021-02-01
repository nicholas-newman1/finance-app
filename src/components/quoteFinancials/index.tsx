import React, { useState } from 'react';
import { formatStatementData, pluck, pluckAll } from '../../helpers';
import useFetch from '../../hooks/useFetch';
import './quoteFinancials.css';
import ButtonBar from '../dumb/BtnBar';
import TableOne from '../dumb/TableOne';
import { getDummyData, getProperties, getTableHeadings } from './helpers';

interface Props {
  symbol: string;
}

const QuoteFinancials: React.FC<Props> = ({ symbol }) => {
  const [statement, setStatement] = useState<Statement>('income-statement');
  const [period, setPeriod] = useState<Period>('');

  // custom hook makes fetch request
  const { data, loading } = useFetch(
    [], // initial value
    `${statement}/${symbol}`, // endpoint
    getDummyData(statement, period), // dummy data
    `period=${period}`, // parameters
    [statement, period] // dependencies
  );

  const statementNavBtns = [
    { text: 'Income Statement', value: 'income-statement' },
    { text: 'Balance Sheet', value: 'balance-sheet-statement' },
    { text: 'Cash Flow', value: 'cash-flow-statement' },
  ];

  const periodNavBtns = [
    { text: 'Annually', value: '' },
    { text: 'Quarterly', value: 'quarter' },
  ];

  return (
    <div className='quote-financials'>
      <div className='quote-financials__nav'>
        <ButtonBar btns={statementNavBtns} setState={setStatement} />
        <ButtonBar btns={periodNavBtns} setState={setPeriod} />
      </div>

      <TableOne
        data={pluckAll(formatStatementData(data), getProperties(statement))}
        rowHeadings={getTableHeadings(statement)}
        headHeadings={pluck(data, 'date')}
        loading={loading}
      />
    </div>
  );
};

export default QuoteFinancials;
