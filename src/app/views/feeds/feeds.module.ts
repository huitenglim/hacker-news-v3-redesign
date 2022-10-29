import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MomentModule } from 'ngx-moment';
import { FeedsRoutingModule } from "./feeds-routing.module";
import { FeedsComponent } from './feeds.component';
import { FeedComponent } from './feed/feed.component';

@NgModule({
  declarations: [
    FeedsComponent,
    FeedComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    FeedsRoutingModule,
    MomentModule
  ],
})
export class FeedsModule { }
