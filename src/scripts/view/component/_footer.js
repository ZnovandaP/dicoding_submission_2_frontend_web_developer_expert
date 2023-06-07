import generateCurrentYear from '../../utilities/get-current-year';
import element from '../../utilities/get-element';

class FooterElement extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
    this._printCurrentYear();
  }

  _render() {
    this.innerHTML = `
      <footer>
        <section class="company-footer">
          <div class="logo">
            <img src="./images/logo/logo.png" alt="Logo perusahaan Resto Radar" />
            <h2>Resto Radar</h2>
          </div>
          <div class="company-copyright">
            <h2>
              Copyright &copy; <span class="year"></span> -
              <span class="company-name">Resto Radar</span>
            </h2>
          </div>
        </section>

        <div class="line-footer"></div>

        <section class="note-author">
          <h2>
            <i class="fa-solid fa-code code-icon" aria-label="Icon Code"></i> Front-end Web Developer
            Expert
          </h2>
          <h2>
            Dibuat dengan <i class="fa-solid fa-heart fa-beat heart-icon" aria-label="Icon Hati"></i>,
            Zidane Novanda Putra
          </h2>
        </section>
      </footer>
    `;
  }

  _printCurrentYear() {
    const elementYearText = element.getElementAll('.year');
    elementYearText.forEach((yearText) => generateCurrentYear(yearText));
  }
}

customElements.define('footer-element', FooterElement);
