/*
Verbose way of injecting a template inside Web Component
const myTemplate = document.createElement('template')
myTemplate.innerHTML = `
  <div>Hello, world!</div>
`;

this._shadowRoot = this.attachShadow({ mode: 'open' })
this._shadowRoot.appendChild(myTemplate.content.cloneNode(true))
*/

// import sheet from './button.css' assert { type: 'css' };

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export class ButtonElement extends HTMLElement {
  static get observedAttributes() {
    return ['btntext', 'btndisabled'];
  }

  get btnText() {
    return this.getAttribute('btnText')?.trim() || 'Next';
  }

  set btnText(value: string) {
    console.log('Setting button text value...', value);
    this.setAttribute('btnText', value);
    // this.btnText = value;
    // this.render();
  }

  get btnDisabled() {
    return this.getAttribute('btnDisabled')!;
  }

  set btnDisabled(value: string) {
    console.log('Setting button state value...', value);

    if (value === 'true') {
      this.setAttribute('btnDisabled', value.toString());
    }

    if (value === 'false') {
      this.removeAttribute('btnDisabled');
    }
    // this.render();
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // super.connectedCallback();
    // this.renderRoot.adoptedStyleSheets = [sheet];

    console.log('Element added to the DOM');

    this.setAllAttributes();

    /* This method renders the button */
    this.render();
  }

  disconnectedCallback() {
    console.log('Element removed from the DOM');
  }

  attributeChangedCallback(
    attributeName: string,
    oldValue: string,
    newValue: string
  ) {
    console.log(
      `Attribute ${attributeName} changed from ${oldValue} to ${newValue}`
    );

    if (attributeName === 'btntext') {
      this.render(); // Update the button text in the render method
    }
  }

  render() {
    if (!this.shadowRoot) return;

    console.log('My button text is ', this.btnText);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }

        :host-context([btnDisabled='true']) button {
          background-color: var(--button-disabled-color);
          border-color: var(--button-disabled-border-color);
          color: var(--color-disabled);
          cursor: not-allowed;
        }

        button {
          display: flex;
          justify-content: center;
          place-items: center;
          outline: none;
          background-color: var(--button-primary-color);
          border: 1px solid transparent;
          border-color: var(--button-primary-border-color);
          color: var(--color-primary);
          user-select: none;
          font-size: 1.1rem;
          padding: 0.375rem 0.75rem;
          border-radius: var(--button-border-radius, var(--button-default-border-radius));
          cursor: pointer;
          height: 50px;
          width: 100%;
        }
      </style>
      <button>
        <slot name="left-icon"></slot>
        <slot>${this.btnText}</slot>
        <slot name="right-icon"></slot>
      </button>
    `;

    this.addEventListeners();
  }

  private setAllAttributes() {
    this.btnText = this.getAttribute('btnText') || this.btnText;
  }

  private addEventListeners() {
    console.log('Adding event listeners...');
    const btn = this.shadowRoot?.querySelector('button');
    console.log('$$$$ ', btn);

    btn?.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    console.log('Button is clicked inside the custom element...');

    /* Dispatching a custom event */
    const eventData = { theme: document.documentElement.getAttribute('theme') };
    const event = new CustomEvent('buttonClicked', {
      detail: eventData,
      bubbles: true,
    });
    this.dispatchEvent(event);
  }
}

customElements.define('ag-button', ButtonElement);
