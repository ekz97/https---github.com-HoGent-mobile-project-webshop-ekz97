
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
        state.totalAmount += action.payload.price; 
      } else {
        const newItem = {
          ...action.payload,
          quantity: 1
        };
        state.items.push(newItem);
        state.totalAmount += newItem.price; 
      }
    },
    removeFromCart: (state, action) => {
      const existingIndex = state.items.findIndex(item => item.id === action.payload);
      if (existingIndex >= 0 && state.items[existingIndex].quantity > 1) {
        state.items[existingIndex].quantity -= 1;
        state.totalAmount -= state.items[existingIndex].price;  
      } else {
        state.totalAmount -= state.items[existingIndex].price;  
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0; 
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
