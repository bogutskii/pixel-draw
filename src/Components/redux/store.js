import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import drawField from './reducers';

const store = createStore(drawField, composeWithDevTools(applyMiddleware()));
export default store;
