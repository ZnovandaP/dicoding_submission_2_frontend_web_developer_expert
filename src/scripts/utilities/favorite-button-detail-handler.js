import Swal from 'sweetalert2';
import favoriteHelper from './favorite-helper';
import favoriteRestaurantIDB from '../data/favorite-restaurant-idb';
import showAlertAndToast from './show-alert';

const { putFavoriteRestaurant, deleteFavoriteRestaurant } = favoriteRestaurantIDB;
const { _isRestaurantExist, _createDataRestaurantToIDB } = favoriteHelper;
const { alertQuestion, toastSuccess } = showAlertAndToast;

class FavoriteButtonDetailHandler {
  constructor({ buttonLikeDetail, buttonLikeIcon, dataRestaurant }) {
    this._buttonLikeDetail = buttonLikeDetail;
    this._buttonLikeIcon = buttonLikeIcon;
    this._dataRestaurant = dataRestaurant;

    this.#_checkConditionButtonBaseOnIDB();
    this.#_buttonHandler(_createDataRestaurantToIDB(this._dataRestaurant));
  }

  #_buttonHandler(dataRestaurant) {
    this._buttonLikeDetail.addEventListener('click', async (event) => {
      event.stopPropagation();

      if (!(await _isRestaurantExist(dataRestaurant.id))) {
        this._buttonLikeIcon.classList.replace('fa-regular', 'fa-solid');
        await putFavoriteRestaurant(dataRestaurant);
        toastSuccess(`${dataRestaurant.name} berhasil ditambahkan ke favorit`);
      } else {
        alertQuestion(async () => {
          this._buttonLikeIcon.classList.replace('fa-solid', 'fa-regular');
          await deleteFavoriteRestaurant(dataRestaurant.id);
          toastSuccess(`${dataRestaurant.name} berhasil dihapus dari favorit`);
        });
      }
    });
  }

  async #_checkConditionButtonBaseOnIDB() {
    if (!(await _isRestaurantExist(this._dataRestaurant.id))) {
      this._buttonLikeIcon.classList.replace('fa-solid', 'fa-regular');
    } else {
      this._buttonLikeIcon.classList.replace('fa-regular', 'fa-solid');
    }
  }
}

export default FavoriteButtonDetailHandler;
