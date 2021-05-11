import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import drawField from './reducers';
import thunk from 'redux-thunk';

const store = createStore(drawField, composeWithDevTools(applyMiddleware(thunk)));
export default store;
