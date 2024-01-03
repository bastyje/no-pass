import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

type AllowedTypes = 'text' | 'password'

@Component({
  selector: 'np-text-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input() id: string;
  @Input() label: string;
  @Input() type: AllowedTypes;
  @Input() controlName: string;
  @Input() parentForm: FormGroup;
}
