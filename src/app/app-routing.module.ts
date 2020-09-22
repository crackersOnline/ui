import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AnonymousGuardGuard } from './anonymous-guard.guard';
import { ProductModule } from './modules/product/product.module';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { ThankYouComponent } from './fragments/functional/thank-you/thank-you.component';


const routes: Routes = [
 /*  {
    path: 'login',
    loadChildren:  () => import('./modules/pages/pages.module').then(m => m.PagesModule),
    canActivate: [AnonymousGuardGuard]
  }, */
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sucess',
    component:ThankYouComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
