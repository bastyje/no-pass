import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type AllowedColorTypes = 'loud' | 'silent'

@Component({
  selector: 'np-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string;
  @Input() type: "submit" | "reset" | "button";
  @Input() colorType: AllowedColorTypes;
}
