import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AnonymousGuardGuard } from './anonymous-guard.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: './modules/pages/pages.module#PagesModule',
    canActivate: [AnonymousGuardGuard]
  },
  {
    path: '',
    redirectTo: '/products',
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
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
