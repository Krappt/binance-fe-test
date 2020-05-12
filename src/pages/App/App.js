import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';
import { STREAM } from '../../config';
import Loader from './components/Loader';
import StarIcon from './components/Icons/Star';
import ArrowIcon from './components/Icons/Arrow';
import SortIcon from './components/Icons/Sort';
import SearchIcon from './components/Icons/Search';
import { formatNumber } from '../../utils';
import styles from './styles.module.scss';

class App extends Component {
  componentDidMount() {
    const { wsConnect, requestProducts } = this.props;
    wsConnect(`stream?streams=${STREAM}`);
    requestProducts();
  }

  changeSort(newProp) {
    const { changeSort, sort } = this.props;
    const { dir, prop } = sort;
    let newDir = dir;
    if (newProp !== prop) newDir = 'asc';
    else if (dir === 'asc') newDir = 'desc';
    else if (dir === 'desc') newDir = 'asc';

    changeSort(newProp, newDir);
  }

  render() {
    const {
      loading,
      wsConnected,
      products,
      selectedProducts,
      onlyFav,
      showChange,
      searchKey,
      selectedPM,
      selectFav,
      selectPM,
      selectProduct,
      sort,
      changeView,
      search,
    } = this.props;
    const show = !loading && wsConnected;
    const markets = [
      { name: 'BNB' },
      { name: 'BTC' },
      {
        name: 'ALTS',
        elems: ['ALL', 'ETH', 'TRX', 'XRP'],
      },
      {
        label: 'FIAT',
        name: 'USDⓈ',
        elems: ['ALL', 'USDT', 'BUSD', 'TUSD', 'USDC', 'PAX', 'BKRW', 'EUR', 'IDRT', 'NGN', 'RUB', 'TRY', 'ZAR'],
      },
    ];

    return (
      <div className={styles.app}>
        { !show && <Loader /> }
        { show &&
          <div>
            <div className={styles.header}>
              Market
            </div>
            <StarIcon
              className={`${styles['icon-star']} ${styles['icon-star-fav']} ${onlyFav ? styles['star-selected'] : ''}`}
              onClick={() => selectFav(!onlyFav)}
            />
            <span className={styles.margin}>Margin</span>
            <ul className={styles.market}>
              { markets.map((item) => {
                const { elems, name, label } = item;
                const active = selectedPM.name === name;
                return (
                  <li
                    key={item.name}
                    className={`${active ? styles['market-active'] : ''}`}
                  >
                    <span role="button" tabIndex={0} onClick={() => !active ? selectPM(name, elems ? elems[0] : '') : null}>{label || name}</span>
                    { elems &&
                      <div className={styles.selector}>
                        <div className={styles['selector-label']}>{(active && selectedPM.elem) || elems[0]}</div> <ArrowIcon />
                        <div className={styles['selector-list']}>
                          { elems.map((elem) =>
                            <div
                              className={styles['selector-item']}
                              key={elem}
                              role="button"
                              tabIndex={0}
                              onClick={() => selectPM(name, elem)}
                            >{elem}</div>
                          )}
                        </div>
                      </div>
                    }
                  </li>
                );
              })}
            </ul>
            <div className={styles.actions}>
              <div className={`search-field ${styles['actions-search']}`}><SearchIcon /><input type="text" placeholder="Search" value={searchKey} onChange={(e) => search(e.target.value)} /></div>
              <div className={styles['actions-view']}>
                <input type="radio" id="c1" name="c1" checked={showChange} onChange={() => changeView(true)} /> <label htmlFor="c1"><span />Change</label>
                <input type="radio" id="c2" name="c2" checked={!showChange} onChange={() => changeView(false)} /> <label htmlFor="c2"><span />Volume</label>
              </div>
            </div>
            <table className={styles.products}>
              <thead>
                <tr>
                  <th onClick={() => this.changeSort('s')}>Pair <SortIcon className={styles['icon-sort']} direction={sort.prop === 's' ? sort.dir : null} /></th>
                  <th onClick={() => this.changeSort('c')}>Last Price <SortIcon className={styles['icon-sort']} direction={sort.prop === 'c' ? sort.dir : null} /></th>
                  { showChange && <th onClick={() => this.changeSort('P')}>Change <SortIcon className={styles['icon-sort']} direction={sort.prop === 'P' ? sort.dir : null} /></th> }
                  { !showChange && <th onClick={() => this.changeSort('qv')}>Volume <SortIcon className={styles['icon-sort']} direction={sort.prop === 'qv' ? sort.dir : null} /></th> }
                </tr>
              </thead>
            </table>
            <SimpleBar className={styles['products-wrap']} autoHide={false}>
              <table className={styles.products}>
                <tbody>
                  { products.map((item, i) => {
                    const increased = item.P > 0;

                    return (
                      <tr key={i}>
                        <td>
                          <StarIcon
                            className={`${styles['icon-star']} ${selectedProducts[item.s] ? styles['star-selected'] : ''}`}
                            onClick={() => selectProduct(item.s)}
                          /> {item.b} / {item.q}</td>
                        <td
                          className={`${item.I ? styles['increased-product'] : ''} ${item.D ? styles['decreased-product'] : ''}`}
                        >
                          {formatNumber(item.c)}
                        </td>
                        { showChange && <td className={increased ? styles['increased-product'] : styles['decreased-product']}>{increased ? '+' : ''}{item.P || '0.00'}%</td> }
                        { !showChange && <td>{formatNumber(item.qv)}</td> }
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {show && !products.length &&
                <div className={styles.empty}>No Products Found</div>
              }
            </SimpleBar>
          </div>
        }
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  wsConnected: PropTypes.bool.isRequired,
  onlyFav: PropTypes.bool.isRequired,
  showChange: PropTypes.bool.isRequired,
  searchKey: PropTypes.string.isRequired,
  selectedPM: PropTypes.object.isRequired,
  selectedProducts: PropTypes.object.isRequired,
  sort: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  wsConnect: PropTypes.func.isRequired,
  requestProducts: PropTypes.func.isRequired,
  selectFav: PropTypes.func.isRequired,
  selectPM: PropTypes.func.isRequired,
  selectProduct: PropTypes.func.isRequired,
  changeSort: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};


export default App;
