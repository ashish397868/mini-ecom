import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartItems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const exists = state.cartItems.find(item => item.id === newItem.id);
            if (!exists) {
                state.cartItems.push({ id: newItem.id });
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== id);
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;