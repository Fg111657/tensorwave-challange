import { fetchStockOverview } from '../utils/fetchData';
import StockTicker from './StockTicker';
import styles from '../styles/Homepage.module.css';
import React, { useEffect, useState } from 'react';

const Homepage = () => {
  const [stockData, setStockData] = useState([]);
  const tickers = ['GOOGL', 'MSFT', 'AMZN', 'NFLX', 'TSLA', 'V', 'JPM', 'WMT', 'CSCO', 'IBM', 'AMD', 'NVDA', 'PYPL', 'DIS'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await Promise.all(
          tickers.map(async (ticker) => fetchStockOverview(ticker))
        );
        setStockData(fetchedData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Stock Tickers</h1>
      <div className={styles.tickerContainer}>
        {stockData.length === 0 ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner} />
            <p className={styles.loadingText}>Loading...</p>
          </div>
        ) : (
          stockData.map(({ Symbol, Name }, index) => (
            <div key={index} className={styles.ticker}>
              <StockTicker symbol={Symbol} name={Name} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Homepage;