import RestaurantResource from '../../data/get-restaurant-resource';
import element from '../../utilities/get-element';
import detailPageTemplate from '../templates/detail';
import postReviewHandler from '../../utilities/post-review-handler';
import urlParser from '../../routes/url-parser';
import showAlertAndToast from '../../utilities/show-alert';
import FavoriteButtonDetailHandler from '../../utilities/favorite-button-detail-handler';
import templateAnimation from '../templates/template-animation';
import CONFIG from '../../global/config';

const { getElement } = element;

const detailPage = {
  _render() {
    return `
    <button type="button" class="button-like-detail" title="Tambahkan ke favorit">
      <i class="fa-regular fa-heart heart-icon" aria-label="Icon Hati"></i>
    </button>
      <section class="container">
        ${templateAnimation.skeletonDetail()}
      </section>
    `;
  },

  async _afterRender() {
    const getUrlId = urlParser._parseUrlWithoutJoinString().id;
    const container = getElement('.container');
    try {
      const detailRestaurant = await RestaurantResource.getDataDetailRestaurant(getUrlId);

      container.innerHTML = templateAnimation.skeletonDetail();

      setTimeout(() => {
        this._renderDetailComponent(container, detailRestaurant);
      }, CONFIG.DURATION_ANIMATION);
    } catch (error) {
      showAlertAndToast.alertError(error);
      container.innerHTML = templateAnimation.skeletonDetail();
    }
  },

  _renderDetailComponent(container, detailRestaurant) {
    container.innerHTML = '';
    container.innerHTML = detailPageTemplate.template(detailRestaurant);
    const favoriteButtonDetailHandler = new FavoriteButtonDetailHandler({
      buttonLikeDetail: getElement('.button-like-detail'),
      buttonLikeIcon: getElement('.heart-icon'),
      dataRestaurant: detailRestaurant,
    });

    postReviewHandler.init({
      formPostSubmit: getElement('#form-post-review'),
      id: urlParser._parseUrlWithoutJoinString().id,
      cardReviewContainer: getElement('.card-review-container'),
    });
  },
};

export default detailPage;
