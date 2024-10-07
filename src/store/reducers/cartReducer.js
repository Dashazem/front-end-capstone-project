import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], isOpen: false },
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + 1, existingItem.max_quantity);
        if (newQuantity > existingItem.quantity) {
          existingItem.quantity = newQuantity;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.isOpen = true;
      }
    },
    closeCart(state) {
      state.isOpen = false;
    },
    increaseItemQuantity(state, action) {
      const itemToIncrease = state.items.find(item => item.id === action.payload.id);
      if (itemToIncrease) {
        const maxQuantity = itemToIncrease.max_quantity;
        const newQuantity = itemToIncrease.quantity + 1;

        if (newQuantity <= maxQuantity) {
          itemToIncrease.quantity = newQuantity;
        }
      }
    },
  },
});

export const { addToCart, closeCart, increaseItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;



