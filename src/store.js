import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import wsMiddleware from './middleware/middleware';
import reducers from './pages/App/reducer';

const middleware = [thunk, wsMiddleware];
const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle
  ),
);
export default store;
