import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretUpsertPageComponent } from './secret-upsert-page/secret-upsert-page.component';
import { authGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [ authGuard ],
    children: [
      {
        path: ':id',
        component: SecretUpsertPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretRoutingModule { }
