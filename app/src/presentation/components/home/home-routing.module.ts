import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HelpComponent } from '../help/help.component';
import { SettingsComponent } from '../settings/settings.component';
import { authGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [ authGuard ],
    children: [
      {
        path: 'secret',
        loadChildren: () => import('../secret/secret.module').then(m => m.SecretModule),
        title: 'Secrets',
      },
      {
        path: 'help',
        component: HelpComponent,
        title: 'Help',
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings',
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class HomeRoutingModule {
}
