import element from '../../utilities/get-element';

const { getElement, getElementAll } = element;
class HeroElement extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
    this._goToPrologue();
    this._goToMainContent();
  }

  _render() {
    this.innerHTML = `
      <section class="hero">
        <button type="button" class="skip-content" tabindex="1">Skip to content</button>
        <img
          src="./images/heros/hero-image_2.jpg"
          alt="Berbagai macam makanan di atas meja"
          class="hero-image"
          loading="lazy"
        />
        <div class="overlay">
          <h2>Resto Radar</h2>
          <h3>Beragam Pilihan Restoran Terbaik Hanya di Satu Platform.</h3>
          <button type="button" id="button-prologue" class="button">Pendahuluan</button>
        </div>
      </section>
    `;
  }

  _goToPrologue() {
    getElement('#button-prologue').addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();

      const prologue = getElement('.prologue');

      if (prologue) {
        prologue.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  _goToMainContent() {
    getElement('.skip-content').addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();

      const mainContent = getElement('#main-content');
      mainContent.focus();

      const targetPosition = mainContent.offsetTop - 50;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  }
}

customElements.define('hero-element', HeroElement);
