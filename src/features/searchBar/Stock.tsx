import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface stockInfo {
  stockName: string;
  price: number;
  dayLow: number;
  dayHigh: number;
  percentageChange: number;
  marketVolume: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
}

export interface historicalStockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
}

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

interface stockState {
  stockList: string[];
  searchedStock: string | null;
  stockInfo: stockInfo | null;
  stockInfoStatus?: "idle" | "loading" | "succeeded" | "failed";
  historicalData: historicalStockData[] | null;
  historicalDataStatus?: "idle" | "loading" | "succeeded" | "failed";
  stockNews: stockNews[] | null,
  stockNewsStatus? : "idle" | "loading" | "succeeded" | "failed";
}

const initialState: stockState = {
  stockList: ["MRF", "TSLA", "TCS", "FB", "SUNO", "CL", "INFY"],
  searchedStock: null,
  stockInfo: null,
  historicalData: null,
  stockNews: null,
};

// Async Thunk functions

// Make a request to our backend server to get the deatials of the stock.
export const fetchSearchedStockInfo = createAsyncThunk(
  "stock/fetchSearchedStockInfo",
  async (searchTerm: string) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:8000/quote`,
        params: {
          stockName: searchTerm,
        },
      });
      console.log(response.data);
      return Promise.resolve(response.data);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
);

// Fetches news from the currents API for news: https://currentsapi.services/en/docs/search.
export const fetchStockNews = createAsyncThunk(
  "stock/fetchStockNews",
  async (searchTerm: string) => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://api.currentsapi.services/v1/search`,
        params: {
          keywords: "tcs",
          country: "IN", 
          category: "finance",
          apiKey: "gubAap9HS5s5lmtGfqPmc6hn6SQJ6JxUBiSdefN3cgJD3Gxo",
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
      let year = new Date().getFullYear() - 1;
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      let startDate: string = `${year}-${month}-${day}`;
      const result = await axios({
        method: "GET",
        url: `http://localhost:8000/historical`,
        params: {
          stockName: searchTerm,
          startDate,
        },
      });
      console.log(result.data);
      return Promise.resolve(result.data);
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
    builder.addCase(fetchSearchedStockInfo.pending, (state, action) => {
      state.stockInfoStatus = "loading";
    });
    builder.addCase(fetchSearchedStockInfo.rejected, (state, action) => {
      state.stockInfoStatus = "failed";
    });
    builder.addCase(
      fetchSearchedStockInfo.fulfilled,
      (state, action) => {
        state.stockInfo = action.payload;
        state.searchedStock = action.payload.stockName;
        state.stockInfoStatus = "succeeded";
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
    builder.addCase(fetchStockNews.pending, (state, action) => {
      state.stockNewsStatus = "loading";
    });
    builder.addCase(fetchStockNews.rejected, (state, action) => {
      state.stockNewsStatus = "failed";
    });
    builder.addCase(
      fetchStockNews.fulfilled,
      // Some issue with the action type that i dont understand currently will fix it later: https://github.com/reduxjs/redux-toolkit/issues/1707
      (state, action: any) => {
        state.stockNews = action.payload;
        state.stockNewsStatus = "succeeded";
      }
    );
  },
});

export default stock.reducer;
export const { updateStockInfo } = stock.actions;
