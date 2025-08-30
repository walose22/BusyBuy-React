import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { productsdata } from "../../Data";

const INITIAL_STATE = {
  products: [],
  searchTerm: "",
  filterPrice: 20000,
  categoryFilter: [],
  isLoading: true,
  error: ""
};
export const InitialProducts = createAsyncThunk(
    'products/InitialProducts',
    async () => {
        
        return productsdata;
    }
);
const productSlice = createSlice({
    name:'products',
    initialState: INITIAL_STATE,
    reducers: {
        SET_SEARCH_TERM:(state, action) => {
            state.searchTerm = action.payload;
        },
        SET_FILTER_PRICE:(state, action)=>{
            state.filterPrice = action.payload;
        },

        SET_CATEGORY_FILTER:(state, action) => {
            state.categoryFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(InitialProducts.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(InitialProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(InitialProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
    }
});
export const {SET_SEARCH_TERM,SET_FILTER_PRICE,SET_CATEGORY_FILTER} = productSlice.actions;
export const productReducer = productSlice.reducer;