class PrologueElement extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <section id="prologue" class="prologue">
        <section class="image-prologue">
          <img
            src="./images/other/prologue.jpg"
            alt="Foto suasana hening di suatu restoran"
            class="prologue-image"
            loading="lazy"
          />
          <div class="overlay">
            <div class="title">
              <h2>Momofuku Las Vegas</h2>
              <p>
                Photo by
                <a
                  href="https://unsplash.com/@ninjason?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                  >Jason Leung</a
                >
                on
                <a
                  href="https://unsplash.com/photos/poI7DelFiVA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                  >Unsplash</a
                >
              </p>
            </div>
          </div>
        </section>
        <article class="text-prologue">
          <h2>Pendahuluan</h2>
          <p>
            Resto Radar merupakan suatu platform katalog restoran yang berbasiskan website. Platform ini menyediakan daftar restoran yang beraneka ragam dari sabang hingga ke merauke. Resto Radar menampilkan berbagai informasi dari rating, lokasi, dan deskripsi mengenai restoran yang terkait, yang mana kami harap Resto Radar dapat membantu memberikan gambaran dan deskripsi mengenai restoran yang akan anda kunjungi.
          </p>
        </article>
      </section>
    `;
  }
}

customElements.define('prologue-element', PrologueElement);
