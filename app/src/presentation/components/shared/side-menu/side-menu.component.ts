import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SideMenuItemComponent } from './side-menu-item/side-menu-item.component';
import { SettingsMenuItem } from '../../settings/menu/settings.menu-item';
import { HelpMenuItem } from '../../help/menu/help.menu-item';
import { SecretMenuItem } from '../../secret/menu/secret.menu-item';

export type MenuItem = {
  name: string,
  icon: string,
  path: string[],
  openSidebarComponent: any,
  sidebarHeader: any
}

const MenuItems: MenuItem[] = [
  SecretMenuItem,
  SettingsMenuItem,
  HelpMenuItem
];

@Component({
  selector: 'np-side-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, SideMenuItemComponent, NgOptimizedImage],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  protected readonly menuItems: MenuItem[] = MenuItems;
  protected selectedAny: boolean = false;
  protected selected: MenuItem | null;
  protected selectedList: boolean[] = new Array(this.menuItems.length).fill(false);

  protected select(item: MenuItem): void {
    this.selectedList = this.selectedList.fill(false);
    if (item === this.selected) {
      this.selected = null;
      this.selectedAny = false;
    } else {
      this.selected = item;
      this.selectedAny = true;
      this.selectedList[this.menuItems.indexOf(item)] = true;
    }
  }
}
