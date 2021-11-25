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

interface stockState {
  stockList: string[];
  searchedStock: string | null;
  stockInfo: stockInfo | null;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}

const initialState: stockState = {
  stockList: ["MRF", "TSLA", "TCS", "FB", "SUNO", "CL", "INFY"],
  searchedStock: null,
  stockInfo: null,
};


// Async Thunk functions

export const updateSearchedStock = createAsyncThunk(
  "stockList/updateSearchedStock",
  async (searchedTerm: string) => {
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:8000/`,
        params: {
          stockName: searchedTerm
        }
      });  
      console.log(response.data);
      // updateStockInfo(response.data);
      return Promise.resolve(response.data);
      }
      catch(err) {
        console.log(err);
        return Promise.reject(err);
      }
  }
);

// Creating the Store Slice
const searchBarReducer = createSlice({
  name: "stockList",
  initialState,
  reducers: {
    updateStockInfo(state, action: PayloadAction<stockInfo>) {
      state.stockInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateSearchedStock.fulfilled, (state, action: PayloadAction<stockInfo>) => {
      state.stockInfo = action.payload;
      state.searchedStock = action.payload.stockName
      state.status = "succeeded";
    });
    builder.addCase(updateSearchedStock.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateSearchedStock.rejected, (state, action) => {
      state.status = "failed";
    })
  }
});

export default searchBarReducer.reducer;
export const { updateStockInfo } =
  searchBarReducer.actions;
