import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './modules/pages/pages.component';
import { AuthGuard } from './auth.guard';
import { UsersComponent } from './modules/admin/users/users.component';


const routes: Routes = [
  {
    path: 'login',
    component: PagesComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: './modules/product/product.module#ProductModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: UsersComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
