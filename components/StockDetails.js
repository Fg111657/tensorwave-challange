import React, { useEffect, useState } from 'react';
import { fetchStockOverview, fetchStockPrices } from '../utils/fetchData';
import styles from '../styles/StockDetails.module.css';

const StockDetails = ({ ticker }) => {
  const [overview, setOverview] = useState(null);
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const overviewData = await fetchStockOverview(ticker);
      const pricesData = await fetchStockPrices(ticker);
      setOverview(overviewData);
      setPrices(pricesData);
    };
    fetchData();
  }, [ticker]);

  if (!overview || !prices) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{overview.Name} ({overview.Symbol})</h1>
      <p>Asset Type: {overview.AssetType || 'N/A'}</p>
      <p>Description: {overview.Description || 'N/A'}</p>
      <p>Exchange: {overview.Exchange || 'N/A'}</p>
      <p>Sector: {overview.Sector || 'N/A'}</p>
      <p>Industry: {overview.Industry || 'N/A'}</p>
      <p>Market Capitalization: {overview.MarketCapitalization || 'N/A'}</p>
      <h2>Historical Prices</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Close Price</th>
            <th>Volume</th>
            <th>Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(prices['Time Series (Daily)']).map(([date, priceData]) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{priceData['4. close']}</td>
              <td>{priceData['5. volume']}</td>
              <td>{((priceData['4. close'] - priceData['1. open']) / priceData['1. open']) * 100}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockDetails;