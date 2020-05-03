import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: './modules/pages/pages.module#PagesModule'
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
    loadChildren: './modules/admin/admin.module#AdminModule',
   // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
