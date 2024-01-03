import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'np-list-item-complex',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-item-complex.component.html',
  styleUrl: './list-item-complex.component.scss'
})
export class ListItemComplexComponent {
  @Input() routerLink: string[];
  @Input() text: string;
  @Input() description: string;
}
