import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface stockInfo {
  stockName: string;
  price: number;
  dayLow: number;
  dayHigh: number;
  percentageChange: number;
  marketVolume: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
}

interface historicalStockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
}

interface stockState {
  stockList: string[];
  searchedStock: string | null;
  stockInfo: stockInfo | null;
  historicalData: historicalStockData[] | null;
  stockInfoStatus?: "idle" | "loading" | "succeeded" | "failed";
  historicalDataStatus?: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: stockState = {
  stockList: ["MRF", "TSLA", "TCS", "FB", "SUNO", "CL", "INFY"],
  searchedStock: null,
  stockInfo: null,
  historicalData: null,
};

// Async Thunk functions

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

export const fetchHistoricalStockData = createAsyncThunk(
  "stock/fetchHistoricalStockData",
  async (searchTerm: string) => {
    try {
      let year = new Date().getFullYear() - 10;
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
      (state, action: PayloadAction<stockInfo>) => {
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
      (state, action: PayloadAction<historicalStockData[]>) => {
        state.historicalData = action.payload;
        state.historicalDataStatus = "succeeded";
      }
    );
  },
});

export default stock.reducer;
export const { updateStockInfo } = stock.actions;
