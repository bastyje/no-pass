import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessage } from '../../../../models/error-message.model';

@Component({
  selector: 'np-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  @Input() errors: ErrorMessage[];
}
