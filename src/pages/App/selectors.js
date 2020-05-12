import { createSelector } from 'reselect';

const productsSelector = (state) => state.products;
const selectedProductsSelector = (state) => state.selectedProducts;
const onlyFavSelector = (state) => state.onlyFav;
const searchKeySelector = (state) => state.searchKey;
const selectedPMSelector = (state) => state.selectedPM;
const sortSelector = (state) => state.sort;

const selectProducts = createSelector(
  productsSelector,
  selectedProductsSelector,
  onlyFavSelector,
  selectedPMSelector,
  sortSelector,
  searchKeySelector,
  (products, selectedProducts, onlyFav, selectedPM, sort, searchKey) => {
    const finalProducts = [];
    const { name, elem } = selectedPM;

    for (let i = 0; i < products.length; i += 1) {
      const item = products[i];
      if (
        item.pm === name &&
        ((onlyFav && selectedProducts[item.s]) || !onlyFav) &&
        ((searchKey && item.s.indexOf(searchKey.toUpperCase()) > -1) || !searchKey) &&
        ((elem && elem === item.q) || !elem || elem === 'ALL')
      ) {
        finalProducts.push(item);
      }
    }

    finalProducts.sort((a, b) => (a[sort.prop] < b[sort.prop] ? -1 : 1) * (sort.dir === 'asc' ? 1 : -1));

    return finalProducts;
  },
);

export { selectProducts };
