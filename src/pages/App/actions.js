import * as types from './constants';
import { API_BASE } from '../../config';

export function requestProducts() {
  const ops = {};

  return (dispatch) => {
    dispatch(getProducts());
    return fetch(`${API_BASE}/get-binance-products`, ops)
      .then(
        (response) => response.json(),
        (error) => dispatch(getProductsError(error))
      ).then((json) => dispatch(getProductsSuccess(json.data)));
  };
}

export function getProducts() {
  return {
    type: types.GET_PRODUCTS,
  };
}

export function getProductsSuccess(data) {
  return {
    type: types.GET_PRODUCTS_SUCCESS,
    payload: { data },
  };
}

export function getProductsError(error) {
  return {
    type: types.GET_PRODUCTS_ERROR,
    payload: { error },
  };
}

export function updateData(data) {
  return {
    type: types.UPDATE_DATA,
    payload: { data },
  };
}

export function selectFav(value) {
  return {
    type: types.ONLY_FAV,
    payload: { value },
  };
}

export function selectPM(pm, elem) {
  return {
    type: types.SELECT_PM,
    payload: { pm, elem },
  };
}

export function selectProduct(index) {
  return {
    type: types.SELECT_PRODUCT,
    payload: { index },
  };
}

export function changeSort(prop, dir) {
  return {
    type: types.CHANGE_SORT,
    payload: { prop, dir },
  };
}

export function changeView(value) {
  return {
    type: types.CHANGE_VIEW,
    payload: { value },
  };
}

export function search(value) {
  return {
    type: types.SEARCH,
    payload: { value },
  };
}
