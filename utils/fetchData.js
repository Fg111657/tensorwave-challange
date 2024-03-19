import axios from 'axios';

const API_KEY = '0V9CSHFL10ST16CN';

export const fetchStockOverview = async (ticker) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${API_KEY}`);
    console.log(response)

    return response.data;
  } catch (error) {
    console.error('Error fetching stock overview:', error);
    return null;
  }
};

export const fetchStockPrices = async (ticker) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock prices:', error);
    return null;
  }
};