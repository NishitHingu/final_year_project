import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface stockInfo {
  stockList: string[];
  searchedStock: string | null;
  stockInfo: Object | null;
  loading?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}

const initialState: stockInfo = {
  stockList: ["MRF", "TSLA", "TCS", "FB", "SUNO", "CL", "INFOSYS"],
  searchedStock: null,
  stockInfo: null,
};

const searchBarReducer = createSlice({
  name: "stockList",
  initialState,
  reducers: {
    updateStockInfo(state, action: PayloadAction<Object>) {
      state.stockInfo = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(upadteSearchedStock.fulfilled, (state, action: PayloadAction<Object>) => {
  //     state.stockInfo = action.payload
  //   })
  // }
});

export const updateSearchedStock = createAsyncThunk(
  "stockList/updateSearchedStock",
  async (searchedTerm: string) => {
    try {
      const response = await axios({
        method: "GET",
        url: `https://api.tiingo.com/tiingo/daily/${searchedTerm}/prices&token=${'c4e8ededfe71cae60c7987fe4430bc4c9b7daeb6'}`,
        headers: {
          'mode': "CORS",
          'Content-Type': 'application/json'
        }
      });  
      console.log(response.data);
      }
      catch(err) {
        console.log(err);
      }

      return null
  }
);

export default searchBarReducer.reducer;
export const { updateStockInfo } =
  searchBarReducer.actions;
