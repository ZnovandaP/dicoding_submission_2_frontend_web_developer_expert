import { async } from 'regenerator-runtime';
import favoriteRestaurantIDB from '../data/favorite-restaurant-idb';
import favoriteHelper from './favorite-helper';
import showAlertAndToast from './show-alert';

const { putFavoriteRestaurant, deleteFavoriteRestaurant } = favoriteRestaurantIDB;
const { _isRestaurantExist, _createDataRestaurantToIDB } = favoriteHelper;
const { alertQuestion, toastSuccess } = showAlertAndToast;

class FavoriteButtonHandlerHome {
  constructor({ favoriteButtonHome, rates, dataRestaurants }) {
    this._favoriteButtonHome = favoriteButtonHome;
    this._rates = rates;
    this._dataRestaurants = dataRestaurants;

    this.#_checkConditionButtonBaseOnIDB();
    this.#_changeColorRateBaseOnIDB();
    this.#_favoriteButtonHandlerHome();
  }

  #_favoriteButtonHandlerHome() {
    this._favoriteButtonHome.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.stopPropagation();

        const getIdButton = event.target.dataset.id;
        const restaurant = _createDataRestaurantToIDB(
          this.#_getdataRestaurant(getIdButton),
        );

        if (!(await _isRestaurantExist(restaurant.id))) {
          button.innerText = 'Tidak Suka';
          await putFavoriteRestaurant(restaurant);
          toastSuccess(`${restaurant.name} berhasil ditambahkan ke favorit`);
        } else {
          alertQuestion(async () => {
            button.innerText = 'Suka';
            await deleteFavoriteRestaurant(restaurant.id);
            toastSuccess(`${restaurant.name} berhasil dihapus dari favorit`);
            this.#_changeColorRateBaseOnIDB();
          });
        }

        this.#_changeColorRateBaseOnIDB();
      });
    });
  }

  #_getdataRestaurant(idbutton) {
    let dataRestaurant;
    this._dataRestaurants.forEach((restaurant) => {
      if (idbutton === restaurant.id) {
        dataRestaurant = restaurant;
      }
    });
    return dataRestaurant;
  }

  #_checkConditionButtonBaseOnIDB() {
    this._dataRestaurants.forEach(async (restaurant, index) => {
      if (!(await _isRestaurantExist(restaurant.id))) {
        this._favoriteButtonHome[index].innerText = 'Suka';
      } else {
        this._favoriteButtonHome[index].innerText = 'Tidak Suka';
      }
    });
  }

  #_changeColorRateBaseOnIDB() {
    this._dataRestaurants.forEach(async (restaurant, index) => {
      if (!(await _isRestaurantExist(restaurant.id))) {
        this._rates[index].style.backgroundColor = '#289672';
      } else {
        this._rates[index].style.backgroundColor = '#dc2626';
      }
    });
  }
}

export default FavoriteButtonHandlerHome;
