import { MenuItem } from '../../shared/side-menu/side-menu.component';
import { HelpSidebarHeaderComponent } from './help-sidebar-header/help-sidebar-header.component';

export const HelpMenuItem: MenuItem = {
  name: 'Help',
  icon: '/static/icons/exclamation-mark.svg',
  path: ['/', 'help'],
  openSidebarComponent: null,
  sidebarHeader: HelpSidebarHeaderComponent
}
