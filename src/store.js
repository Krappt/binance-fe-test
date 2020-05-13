import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import wsMiddleware from './middleware/middleware';
import reducers from './pages/App/reducer';

const middleware = [thunk, wsMiddleware];
const composeEnhancers =
  process.env.NODE_ENV === 'development' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;
const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);
const store = createStore(reducers, enhancer);

export default store;
