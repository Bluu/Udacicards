import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import decksReducer from '../reducer';

export default createStore(
    decksReducer,
    compose(applyMiddleware(thunk))
)