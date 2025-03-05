class AToZUL extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        menu {
          list-style-type: none;
          padding: 0;
        }
        menu li {
          display: inline;
          margin-right: 10px;
        }
        .letter-section {
          list-style-type: none;
        }
        .letter-section a {
          text-decoration: none;
          font-weight: bold;
        }
        .back-to-menu {
          display: block;
          margin-top: 20px;
        }
      </style>
      <menu id="menu"></menu>
      <ul id="list"></ul>
      ${this.hasAttribute('long') ? '<a class="back-to-menu" href="#menu">Back to Menu</a>' : ''}
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const list = this.shadowRoot.querySelector('#list');
    const menu = this.shadowRoot.querySelector('#menu');

    const items = this.innerHTML.trim().split('\n').map(item => item.trim()).filter(item => item);
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const sections = {};

    items.forEach(item => {
      const firstLetter = item[0].toUpperCase();
      if (!sections[firstLetter]) {
        sections[firstLetter] = [];
      }
      sections[firstLetter].push(item);
    });

    alphabet.split('').forEach(letter => {
      if (sections[letter]) {
        const menuItem = document.createElement('li');
        const menuLink = document.createElement('a');
        menuLink.href = `#section-${letter}`;
        menuLink.textContent = letter;
        menuItem.appendChild(menuLink);
        menu.appendChild(menuItem);

        const section = document.createElement('li');
        section.classList.add('letter-section');
        const sectionHeading = document.createElement('a');
        sectionHeading.href = `#menu`;
        sectionHeading.textContent = letter;
        section.appendChild(sectionHeading);

        const sectionList = document.createElement('ul');
        sections[letter].forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = item;
          sectionList.appendChild(listItem);
        });
        section.appendChild(sectionList);
        list.appendChild(section);
      }
    });
  }
}

customElements.define('a-to-z-ul', AToZUL);

export { AToZUL };
