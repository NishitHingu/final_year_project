import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface stockInfo {
  stockList: string[];
  searchedStocks: string[];
}

const initialState: stockInfo = {
  stockList: [
    "MRF",
    "TSLA",
    "TCS",
    "FB",
    "SUNO",
    "CL",
    "INFOSYS",
  ],
  searchedStocks: []
}

const searchBarReducer = createSlice({
  name: "stockList",
  initialState,
  reducers: {
    addStockToSearchedList (state, action: PayloadAction<string>) {
      state.searchedStocks = [ ...state.searchedStocks, action.payload]
    }
  }
})

export default searchBarReducer.reducer;
export const { addStockToSearchedList } = searchBarReducer.actions;