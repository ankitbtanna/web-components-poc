import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import '@ui-components/button';
import {
  FormGroup,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';

@Component({
  selector: 'web-components-poc-nx-welcome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './nx-welcome.component.html',
  styleUrls: ['./nx-welcome.component.scss'],
})
export class NxWelcomeComponent {
  btnFormGroup = new FormGroup({
    btnText: new UntypedFormControl(''),
    brand: new UntypedFormControl('BUDD'),
    btnDisabled: new UntypedFormControl(false),
  });

  constructor(@Inject(DOCUMENT) private document: Document) {}

  onBrandChange() {
    const brand = this.btnFormGroup.controls.brand.value || 'BUDD';
    this.document.documentElement.setAttribute('theme', brand);
  }

  onButtonClick(evt: any) {
    console.log(
      'Button click event received inside Angular Component...',
      evt.detail
    );
  }
}
