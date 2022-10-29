import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'feeds', loadChildren: () => import('./views/feeds/feeds.module').then(m => m.FeedsModule) },
  { path: '', pathMatch: 'full', redirectTo: 'feeds/top' },
  { path: '**', redirectTo: 'feeds/top' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
