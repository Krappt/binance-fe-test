import * as types from './constants';
import { convertExponentialToDecimal } from '../../utils';

const initialState = {
  loading: false,
  wsConnected: false,
  products: [],
  selectedProducts: {},
  selectedPM: { name: 'BNB', elem: '' },
  onlyFav: false,
  showChange: true,
  searchKey: '',
  sort: { dir: 'asc', prop: 's' },
  error: false,
};

function getPrice(prices, s) {
  for (let i = 0; i < prices.length; i += 1) {
    const item = prices[i];

    if (item.s === s) {
      return item;
    }
  }
  return {};
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return {
        ...state,
        loading: true,
        error: false,
        products: [],
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload.data || [],
      };
    case types.GET_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case types.UPDATE_DATA: {
      const { products } = state;
      const prices = action.payload.data;
      const newProducts = [];

      for (let i = 0; i < products.length; i += 1) {
        const product = products[i];
        const newProduct = { ...product };
        const price = getPrice(prices, product.s);
        let change = 0;
        newProduct.I = price.c > product.c;
        newProduct.D = price.c < product.c;
        newProduct.c = convertExponentialToDecimal(price.c || product.c);
        newProduct.qv = parseFloat((price.qv || product.qv).toFixed(2));
        change = ((newProduct.c - newProduct.o) / newProduct.o) * 100;
        newProduct.P = parseFloat(change.toFixed(2));

        newProducts.push(newProduct);
      }
      return {
        ...state,
        wsConnected: true,
        products: newProducts,
      };
    }
    case types.ONLY_FAV:
      return {
        ...state,
        onlyFav: action.payload.value,
      };
    case types.SELECT_PM:
      return {
        ...state,
        selectedPM: { name: action.payload.pm, elem: action.payload.elem },
      };
    case types.SELECT_PRODUCT: {
      const { index } = action.payload;
      const selectedProducts = { ...state.selectedProducts };

      if (selectedProducts[index]) delete selectedProducts[index];
      else selectedProducts[index] = true;

      return {
        ...state,
        selectedProducts,
      };
    }
    case types.CHANGE_SORT: {
      const { prop, dir } = action.payload;
      return {
        ...state,
        sort: { dir, prop },
      };
    }
    case types.CHANGE_VIEW:
      return {
        ...state,
        showChange: action.payload.value,
      };
    case types.SEARCH:
      return {
        ...state,
        searchKey: action.payload.value,
      };
    default:
      return state;
  }
};
