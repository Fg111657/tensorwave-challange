import React from 'react';
import Link from 'next/link';

const StockTicker = ({ stock }) => {
  return (
    <Link href={`/stock/${stock.Symbol}`}>
      <div>{stock.Symbol} - {stock.Name}</div>
    </Link>
  );
};

export default StockTicker;