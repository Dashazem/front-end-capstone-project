import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
});

export default rootReducer;



