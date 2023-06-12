import CONFIG from '../../global/config';
import RestaurantResource from '../../data/get-restaurant-resource';
import urlParser from '../../routes/url-parser';
import detailPageTemplate from '../templates/detail';
import templateAnimation from '../templates/template-animation';
import postReviewHandler from '../../utilities/post-review-handler';
import element from '../../utilities/get-element';
import showAlertAndToast from '../../utilities/show-alert';
import FavoriteButtonDetailHandler from '../../utilities/favorite-button-detail-handler';
import skipToMainContent from '../../utilities/skip-content-handler';

const { getElement } = element;

const detailPage = {
  _render() {
    return `
    <button type="button" class="button-like-detail" title="Tambahkan ke favorit">
      <i class="fa-regular fa-heart heart-icon" aria-label="Icon Hati"></i>
    </button>
    <button type="button" class="skip-content detail" tabindex="1">Skip to content</button>

      <section id="main-content-detail" class="container" tabindex="0">
        ${templateAnimation.skeletonDetail()}
      </section>
    `;
  },

  async _afterRender() {
    skipToMainContent(
      getElement('.skip-content.detail'),
      getElement('#main-content-detail'),
    );

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
