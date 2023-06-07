import { async } from 'regenerator-runtime';
import API_ENDPOINT from '../../global/api-endpoint';
import element from '../../utilities/get-element';
import favoriteHelper from '../../utilities/favorite-helper';
import favoriteRestaurantIDB from '../../data/favorite-restaurant-idb';
import showAlertAndToast from '../../utilities/show-alert';

const { IMAGE_URL } = API_ENDPOINT;
const { getElement } = element;
const { putFavoriteRestaurant, deleteFavoriteRestaurant } = favoriteRestaurantIDB;
const { _isRestaurantExist, _createDataRestaurantToIDB } = favoriteHelper;
const { alertQuestion, toastSuccess } = showAlertAndToast;

const modalBodyComponent = {
  initButtonHandlerModalBody(dataRestaurants) {
    this._buttonLikeModal = getElement('.button-like-modal');
    this._buttonLikeIcon = getElement('.heart-icon');
    this._textButtonLike = getElement('.text-button-like');
    this._buttonDetailModal = getElement('.button-detail-restaurant-modal');
    this._dataRestaurants = dataRestaurants;

    this._checkConditionButtonBaseOnIDB();
    this._buttonLikeHandler(_createDataRestaurantToIDB(this._dataRestaurants));
    this._buttonDetailHandler();
  },

  template({
    pictureId, name, rating, city, description, id,
  }) {
    return `
      <!-- left/top -->
      <section class="left">
        <img
          src="${IMAGE_URL.medium}${pictureId}"
          alt="Restoran ${name}"
          loading="lazy"
          class="modal-image"
        />
      </section>

      <!-- right/bottom -->
      <section class="right">
        <div class="name-restaurant">
          <h2 class="title">Nama Restoran<span class="line"></span></h2>
          <h3>${name}</h3>
        </div>

        <div class="location-restaurant">
          <h2 class="title">Lokasi Restoran<span class="line"></span></h2>
          <h3>
            <i
              class="fa-solid fa-map-location-dot"
              aria-label="Icon peta"
            ></i>
            ${city}
          </h3>
        </div>

        <div class="rate-restaurant">
          <h2 class="title">Rating Restoran<span class="line"></span></h2>
          <h3>
            <i
              class="fa-regular fa-star star"
              aria-label="Icon bintang"
            ></i>
            <span>${rating}</span>
          </h3>
        </div>

        <div class="description-restaurant">
          <h2 class="title">
            Deskripsi Restoran<span class="line"></span>
          </h2>
          <article>
          <p class="description-text">
            ${description}
          </p>
          </article>
        </div>
        <div class="buttons-modal">
          <button type="button" class="button-like-modal" data-id="${id}">
            <i class="fa-regular fa-heart heart-icon" aria-label="Tombol suka" data-id="${id}"></i> 
            <span class="text-button-like" data-id="${id}">Suka</span>
          </button>
          <a href="#/detail/${id}" class="button-detail-restaurant-modal" data-id="${id}">
          Detail Restoran</a>
        </div>
      </section>
    `;
  },

  _buttonLikeHandler(dataRestaurant) {
    this._buttonLikeModal.addEventListener('click', async (event) => {
      event.stopPropagation();

      if (this._isButtonLike()) {
        if (!(await _isRestaurantExist(dataRestaurant.id))) {
          this._textButtonLike.innerText = 'Tidak Suka';
          this._buttonLikeIcon.classList.replace('fa-regular', 'fa-solid');
          await putFavoriteRestaurant(dataRestaurant);
          toastSuccess(`${dataRestaurant.name} berhasil ditambahkan ke favorit`);
        } else {
          alertQuestion(async () => {
            this._textButtonLike.innerText = 'Suka';
            this._buttonLikeIcon.classList.replace('fa-solid', 'fa-regular');
            await deleteFavoriteRestaurant(dataRestaurant.id);
            toastSuccess(`${dataRestaurant.name} berhasil dihapus dari favorit`);
          });
        }
      }
    });
  },

  _buttonDetailHandler() {
    this._buttonDetailModal.addEventListener('click', (event) => {
      event.stopPropagation();
      document.body.classList.remove('modal-freeze-page');
    });
  },

  _isButtonLike() {
    return this._buttonLikeIcon.classList.contains('heart-icon')
      || this._textButtonLike.classList.contains('text-button-like');
  },

  async _checkConditionButtonBaseOnIDB() {
    if (!(await _isRestaurantExist(this._buttonLikeModal.dataset.id))) {
      this._buttonLikeIcon.classList.replace('fa-solid', 'fa-regular');
      this._textButtonLike.innerText = 'Suka';
    } else {
      this._buttonLikeIcon.classList.replace('fa-regular', 'fa-solid');
      this._textButtonLike.innerText = 'Tidak Suka';
    }
  },
};

export default modalBodyComponent;
