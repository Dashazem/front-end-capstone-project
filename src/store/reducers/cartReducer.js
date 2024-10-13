import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {

  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : { items: [], totalAmount: 0 };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart(state, action) {
      const price = parseFloat(action.payload.price);
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + 1, existingItem.max_quantity);
        if (newQuantity > existingItem.quantity) {
          state.totalAmount = parseFloat((state.totalAmount + price).toFixed(2));
          existingItem.quantity = newQuantity;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalAmount = parseFloat((state.totalAmount + price).toFixed(2));
      }
      localStorage.setItem('cart', JSON.stringify(state)); 
    },
    increaseItemQuantity(state, action) {
      const itemToIncrease = state.items.find(item => item.id === action.payload.id);
      if (itemToIncrease) {
        const maxQuantity = itemToIncrease.max_quantity;
        const newQuantity = itemToIncrease.quantity + 1;

        if (newQuantity <= maxQuantity) {
          const price = parseFloat(itemToIncrease.price);
          state.totalAmount = parseFloat((state.totalAmount + price).toFixed(2));
          itemToIncrease.quantity = newQuantity;
          state.errorMessage = '';
          localStorage.setItem('cart', JSON.stringify(state)); 
        } else {
          state.errorMessage = "Stock insuficiente"; 
        }
      }
    },
    decreaseItemQuantity(state, action) {
      const itemToDecrease = state.items.find(item => item.id === action.payload.id);
      if (itemToDecrease) {
        const price = parseFloat(itemToDecrease.price);
        if (itemToDecrease.quantity > 1) {
          state.totalAmount = parseFloat((state.totalAmount - price).toFixed(2));
          itemToDecrease.quantity -= 1;
        } else {
          state.totalAmount = parseFloat((state.totalAmount - price).toFixed(2));
          state.items = state.items.filter(item => item.id !== action.payload.id);
        }
        localStorage.setItem('cart', JSON.stringify(state)); 
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, clearCart, increaseItemQuantity, decreaseItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;


