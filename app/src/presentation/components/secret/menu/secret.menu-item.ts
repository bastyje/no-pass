import { MenuItem } from '../../shared/side-menu/side-menu.component';
import { SecretSideMenuComponent } from './secret-side-menu/secret-side-menu.component';
import { SecretSidebarHeaderComponent } from './secret-sidebar-header/secret-sidebar-header.component';

export const SecretMenuItem: MenuItem = {
  name: 'Secret',
  icon: '/static/icons/lock.svg',
  path: ['/', 'secret'],
  openSidebarComponent: SecretSideMenuComponent,
  sidebarHeader: SecretSidebarHeaderComponent
}
