import API_ENDPOINT from '../../global/api-endpoint';

const { IMAGE_URL } = API_ENDPOINT;

const cardComponent = ({
  id, pictureId, name, rating, city,
}) => `
  <div class="card" aria-label="Card content" role="card" tabindex="0" data-id="${id}">
  <img
    src="${IMAGE_URL.small}${pictureId}"
    alt="Restoran ${name}"
    loading="lazy"
    class="card-image"
  />
  <div class="overlay" data-id="${id}">
    <div class="rate" data-id="${id}">
      <i
        class="fa-regular fa-star star"
        aria-label="Icon bintang"
      ></i>
      <p class="rating-restaurant">${rating}</p>
    </div>

    <button
      type="button"
      class="button-info"
      title="Tombol info lainya"
    >
      <i
        class="fa-solid fa-circle-info info-icon"
        aria-label="Tombol info"
      ></i>
    </button>

    <div class="wrapper-card-menu">
    <button class="button-close" type="button" title="Tutup card menu">
      <i class="fa-regular fa-circle-xmark" aria-label="Icon X"></i>
    </button>
      <div class="card-menu">
        <button type="button" class="button-like" data-id="${id}">Suka</button>
        <button type="button" class="button-preview" data-id="${id}">Pratinjau</button>
        <a href="#/detail/${id}" class="button-detail-restaurant" data-id="${id}">Detail Restoran</a>
      </div>
    </div>

    <div class="card-content">
      <p class="city-restaurant">
        <i
          class="fa-solid fa-map-location-dot"
          aria-label="Icon peta"
        ></i>
        ${city}
      </p>
      <h2 class="restaurant-name">${name}</h2>
    </div>
  </div>
</div>
  `;

export default cardComponent;
