/*import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Імпортуємо thunk
import rootReducer from '../store/reducers/reducers';


const store = createStore(rootReducer, applyMiddleware(thunk)); // Додаємо thunk як middleware

export default store;*/


/*import { createStore } from 'redux';
import rootReducer from '../store/reducers/reducers';

const store = createStore(rootReducer); 

export default store;*/

// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducers'; // шлях до вашого rootReducer

const store = configureStore({
  reducer: rootReducer,
});

export default store;






