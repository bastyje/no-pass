import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../text-input/text-input.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'np-text-input-with-inline-submit-button',
  standalone: true,
  imports: [CommonModule, TextInputComponent, ButtonComponent],
  templateUrl: './text-input-with-inline-submit-button.component.html',
  styleUrl: './text-input-with-inline-submit-button.component.scss'
})
export class TextInputWithInlineSubmitButtonComponent extends TextInputComponent {
  @Input() buttonText: string;
}
