import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from '../shared/side-menu/side-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'np-home',
  standalone: true,
  imports: [CommonModule, SideMenuComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
