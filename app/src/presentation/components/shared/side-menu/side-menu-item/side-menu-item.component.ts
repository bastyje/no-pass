import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'np-side-menu-item',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './side-menu-item.component.html',
  styleUrl: './side-menu-item.component.scss'
})
export class SideMenuItemComponent {
  @Input() icon: string;
  @Input() alt: string;
  @Input() selected: boolean;
}
