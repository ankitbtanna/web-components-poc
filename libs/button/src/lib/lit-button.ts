import { html, css, LitElement, PropertyValueMap } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
@customElement('lit-ag-button')
export class LitAgButtonElement extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    button[disabled='true'] {
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
      border-radius: var(
        --button-border-radius,
        var(--button-default-border-radius)
      );
      cursor: pointer;
      height: 50px;
      width: 100%;
    }
  `;

  @property({ type: String })
  btnText = '';

  @property({ type: String })
  btnDisabled = `false`;

  constructor() {
    super();
  }

  override render() {
    return html`
      <button @click="${this.handleClick}">
        <slot name="left-icon"></slot>
        <slot>${this.btnText}</slot>
        <slot name="right-icon"></slot>
      </button>
    `;
  }

  protected override update(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.update(changedProperties);
    console.log('changedProperties', changedProperties);
  }

  protected override updated(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.updated(changedProperties);
    console.log('_changedProperties updated', changedProperties);
    if (changedProperties.has('btnDisabled')) {
      if (changedProperties.get('btnDisabled') === 'false') {
        this.shadowRoot
          ?.querySelector('button')!
          .setAttribute('disabled', 'true');
      } else {
        this.shadowRoot?.querySelector('button')!.removeAttribute('disabled');
      }
    }
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
