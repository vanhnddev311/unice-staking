import rootReducer from '@/common/stores/reducers';
import { createStore } from 'redux';

const store = createStore(rootReducer);
export default store;
