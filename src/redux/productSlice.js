import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  loadingMore: false,
};

const productsStore = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload; //initial list of products
    },
    appendProducts(state, action) {
      state.products.push(...action.payload); // add more products to the existing list
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setLoadingMore(state, action) {
      state.loadingMore = action.payload;
    }
  },
});

export const { setProducts, appendProducts, setLoading, setLoadingMore} = productsStore.actions;
export default productsStore.reducer;