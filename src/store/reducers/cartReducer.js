/*import { INCREASE_ITEM_QUANTITY } from '../actions/cartActions';

const initialState = {
  items: [],
  isOpen: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
  
      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + 1, existingItem.max_quantity);
    
        if(newQuantity > existingItem.quantity){
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id 
                ? { ...item, quantity: newQuantity }
                : item
            ),
          };
        }
      }

    return {
      ...state,
      items: [...state.items, { ...action.payload, quantity: 1 }],
      isOpen: true,
    };


    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };


    case INCREASE_ITEM_QUANTITY: {
      const itemToIncrease = state.items.find(item => item.id === action.payload.id);
      if (itemToIncrease) {
        const maxQuantity = itemToIncrease.max_quantity; 
        const newQuantity = itemToIncrease.quantity + 1;
  
        if (newQuantity <= maxQuantity) {
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id 
                ? { ...item, quantity: newQuantity }
                : item
            ),
          };
        }
      }
      return state;
    }
    
      
    default:
      return state;
  }
};

export default cartReducer;*/

// store/cartReducer.js
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



