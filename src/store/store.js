import { createStore } from 'redux';

import rootReducer from '../store/reducers/reducers'; 


const store = createStore(rootReducer);

export default store;


