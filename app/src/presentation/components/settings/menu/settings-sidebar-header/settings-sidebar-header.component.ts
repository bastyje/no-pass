import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'np-settings-sidebar-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './settings-sidebar-header.component.html',
  styleUrl: './settings-sidebar-header.component.scss'
})
export class SettingsSidebarHeaderComponent {
  @Input() name: string;
}
