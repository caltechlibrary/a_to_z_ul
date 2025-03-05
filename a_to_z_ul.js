class AToZUL extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      const longCount = parseInt(this.getAttribute('long-count')) || 50;
      const ul = this.querySelector('ul');
      if (!ul) return;
  
      const items = Array.from(ul.children);
      const groupedItems = this.groupItemsByAlphabet(items);
  
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
          .back-to-menu {
            display: ${items.length > longCount ? 'block' : 'none'};
            margin-top: 20px;
          }
        </style>
        <menu id="menu"></menu>
        <div id="list-container"></div>
        <a class="back-to-menu" href="#menu">Back to Menu</a>
      `;
  
      this.shadowRoot.appendChild(template.content.cloneNode(true));
  
      const menu = this.shadowRoot.querySelector('menu');
      const listContainer = this.shadowRoot.querySelector('#list-container');
  
      for (const letter in groupedItems) {
        const menuItem = document.createElement('li');
        const menuLink = document.createElement('a');
        menuLink.href = `#section-${letter}`;
        menuLink.textContent = letter;
        menuItem.appendChild(menuLink);
        menu.appendChild(menuItem);
  
        const section = document.createElement('section');
        section.id = `section-${letter}`;
        const sectionTitle = document.createElement('h3');
        sectionTitle.innerHTML = `<a href="#menu">${letter}</a>`;
        section.appendChild(sectionTitle);
  
        const sectionList = document.createElement('ul');
        groupedItems[letter].forEach(item => sectionList.appendChild(item.cloneNode(true)));
        section.appendChild(sectionList);
        listContainer.appendChild(section);
      }
    }
  
    groupItemsByAlphabet(items) {
      const groups = {};
      items.forEach(item => {
        const firstLetter = item.textContent.trim()[0].toUpperCase();
        if (!groups[firstLetter]) {
          groups[firstLetter] = [];
        }
        groups[firstLetter].push(item);
      });
      return groups;
    }
  }
  
  customElements.define('a-to-z-ul', AToZUL);
  
  export { AToZUL };
  