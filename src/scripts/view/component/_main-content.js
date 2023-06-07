class MainContent extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <section class="content">
        <div class="title">
          <h2>Daftar Restoran</h2>
        </div>
        
        <section class="card-container"></section>
      </section>
    `;
  }
}

customElements.define('main-content', MainContent);
