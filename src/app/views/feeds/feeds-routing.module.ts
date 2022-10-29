import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FeedsComponent } from './feeds.component';

const routes: Route[] = [
  { path: ':type', component: FeedsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedsRoutingModule {}
