import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'np-secret-sidebar-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './secret-sidebar-header.component.html',
  styleUrl: './secret-sidebar-header.component.scss'
})
export class SecretSidebarHeaderComponent {
  @Input() name: string;
}
