import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import stockNameList from "../../media/jsonData/StockList.json";
import currency_map from "../../media/jsonData/Country_Currency_map.json";

export interface stockInfo {
  stockName: string;
  stockLongName: string;
  price: number;
  dayLow: number;
  dayHigh: number;
  percentageChange: number;
  marketVolume: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  financialCurrency: string;
}

export interface historicalStockData {
  x: Date, 
  y: number[]
};

export interface stockNews {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  language: string;
  category: string[];
  published: string;
}

export interface StockList {
  Ticker: string;
  Name: string;
}

interface stockState {
  stockList: StockList[];
  searchedStock: string | null;
  stockInfo: stockInfo | null;
  stockInfoStatus?: "idle" | "loading" | "succeeded" | "failed";
  historicalData: historicalStockData[] | null;
  historicalDataStatus?: "idle" | "loading" | "succeeded" | "failed";
  stockNews: stockNews[] | null,
  stockNewsStatus? : "idle" | "loading" | "succeeded" | "failed";
}

const initialState: stockState = {
  stockList: stockNameList,
  searchedStock: null,
  stockInfo: null,
  historicalData: null,
  stockNews: null,
};

// Async Thunk functions

// Make a request to our backend server to get the deatials of the stock.
export const fetchSearchedStockInfoAndNews = createAsyncThunk(
  "stock/fetchSearchedStockInfo",
  async (searchTerm: string) => {
    try {

      // Fetching stock Info
      const response = await axios({
        method: "GET",
        url: `http://localhost:8000/tickInfo/${searchTerm}`,
      });
      console.log(response.data);
      const stockInfo = JSON.parse(response.data);

      // Fetching Stock News
      console.log(process.env.REACT_NEWS_API_KEY);
      const newsResponse = await axios({
        method: "GET",
        url: `https://api.currentsapi.services/v1/search`,
        params: {
          keywords: stockInfo.stockLongName,
          apiKey: "gubAap9HS5s5lmtGfqPmc6hn6SQJ6JxUBiSdefN3cgJD3Gxo",
          limit: 20,
        }
      });
      const stockNews = newsResponse.data.news;
      const data = {
        stockInfo,
        stockNews
      }
      return Promise.resolve({stockInfo, stockNews})
      
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
);

// Fetches news from the currents API for news: https://currentsapi.services/en/docs/search.
// Not being used currently as we make the news requesting with the stockInfo itself
// We do that because we needed the full name of the ticker which we get from the stockInfo 
export const fetchStockNews = createAsyncThunk(
  "stock/fetchStockNews",
  async (searchTerm: string) => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://api.currentsapi.services/v1/search`,
        params: {
          keywords: searchTerm,
          apiKey: process.env.REACT_NEWS_API_KEY,
          limit: 20,
        }
      });
      console.log(response.data.news);
      return Promise.resolve(response.data.news);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
);

// Gets the historical data from our backend server
export const fetchHistoricalStockData = createAsyncThunk(
  "stock/fetchHistoricalStockData",
  async (searchTerm: string) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:8000/stock/${searchTerm}/356`,
      });
      const result = JSON.parse(response.data);
      return Promise.resolve(result);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
);

// Creating the Store Slice
const stock = createSlice({
  name: "stock",
  initialState,
  reducers: {
    updateStockInfo(state, action: PayloadAction<stockInfo>) {
      state.stockInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Builder function to update state accourding to the Stock information data fetch progress
    builder.addCase(fetchSearchedStockInfoAndNews.pending, (state, action) => {
      state.stockInfoStatus = "loading";
      state.stockNewsStatus = "loading";
    });
    builder.addCase(fetchSearchedStockInfoAndNews.rejected, (state, action) => {
      state.stockInfoStatus = "failed";
      state.stockNewsStatus = "failed";
    });
    builder.addCase(
      fetchSearchedStockInfoAndNews.fulfilled,
      (state, action: any) => {
        state.stockInfo = action.payload.stockInfo;
        state.searchedStock = action.payload.stockInfo.stockName;
        state.stockNews = action.payload.stockNews;
        state.stockInfoStatus = "succeeded";
        state.stockNewsStatus = "succeeded";
      }
    );

    // Builder function to update state accourding to the Historical data fetch progress
    builder.addCase(fetchHistoricalStockData.pending, (state, action) => {
      state.historicalDataStatus = "loading";
    });
    builder.addCase(fetchHistoricalStockData.rejected, (state, action) => {
      state.historicalDataStatus = "failed";
    });
    builder.addCase(
      fetchHistoricalStockData.fulfilled,
      (state, action) => {
        state.historicalData = action.payload;
        state.historicalDataStatus = "succeeded";
      }
    );


    // builder.addCase(fetchStockNews.pending, (state, action) => {
    //   state.stockNewsStatus = "loading";
    // });
    // builder.addCase(fetchStockNews.rejected, (state, action) => {
    //   state.stockNewsStatus = "failed";
    // });
    // builder.addCase(
    //   fetchStockNews.fulfilled,
    //   // Some issue with the action type that i dont understand currently will fix it later: https://github.com/reduxjs/redux-toolkit/issues/1707
    //   (state, action: any) => {
    //     state.stockNews = action.payload;
    //     state.stockNewsStatus = "succeeded";
    //   }
    // );
  },
});

export default stock.reducer;
export const { updateStockInfo } = stock.actions;
