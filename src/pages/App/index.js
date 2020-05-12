import { connect } from 'react-redux';
import { wsConnect } from '../../middleware/websocket';
import {
  requestProducts,
  selectFav,
  selectPM,
  selectProduct,
  changeSort,
  changeView,
  search,
} from './actions';
import { selectProducts } from './selectors';
import App from './App';

function mapStateToProps(state) {
  return {
    loading: state.loading,
    wsConnected: state.wsConnected,
    selectedPM: state.selectedPM,
    onlyFav: state.onlyFav,
    showChange: state.showChange,
    searchKey: state.searchKey,
    selectedProducts: state.selectedProducts,
    sort: state.sort,
    products: selectProducts(state),
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    wsConnect: (url) => { dispatch(wsConnect(url)); },
    requestProducts: () => { dispatch(requestProducts()); },
    selectFav: (value) => { dispatch(selectFav(value)); },
    selectPM: (pm, elem) => { dispatch(selectPM(pm, elem)); },
    selectProduct: (index) => { dispatch(selectProduct(index)); },
    changeSort: (prop, dir) => { dispatch(changeSort(prop, dir)); },
    changeView: (value) => { dispatch(changeView(value)); },
    search: (value) => { dispatch(search(value)); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
