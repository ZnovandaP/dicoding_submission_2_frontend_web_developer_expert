class HeroElement extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <section class="hero">
        <img
          src="./images/heros/hero-image_2.jpg"
          alt="Berbagai macam makanan di atas meja"
          class="hero-image"
          loading="lazy"
        />
        <div class="overlay">
          <h2>Resto Radar</h2>
          <h3>Beragam Pilihan Restoran Terbaik Hanya di Satu Platform.</h3>
          <a href="#prologue" class="button">Pendahuluan</a>
        </div>
      </section>
    `;
  }
}

customElements.define('hero-element', HeroElement);
