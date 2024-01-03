import { MenuItem } from '../../shared/side-menu/side-menu.component';
import { SettingsSidebarHeaderComponent } from './settings-sidebar-header/settings-sidebar-header.component';

export const SettingsMenuItem: MenuItem = {
  name: 'Settings',
  icon: '/static/icons/gear.svg',
  path: ['/', 'settings'],
  openSidebarComponent: null,
  sidebarHeader: SettingsSidebarHeaderComponent
}
