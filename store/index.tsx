import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import memberReducer from "./reducers/memberReducer";

const store = createStore(memberReducer, applyMiddleware(thunk));

export default store;