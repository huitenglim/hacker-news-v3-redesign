import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedsService } from '../../services/feeds.service';
import { Feed } from '../../models/feed.model';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  feeds: Array<Observable<Feed>> = [];
  feedLimit: number = 0;

  constructor(private feedsService: FeedsService) { }

  ngOnInit(): void {
    this.feedsService.fetchFeeds('top')
      .subscribe(() => {
        this.feeds = this.feedsService.feeds;
        this.feedLimit =  10;
        this.onScrollToLoadFeed();
      });
  }

  /**
   * Adds 10 feed on every scroll in the viewport until
   * there is no more feed to add.
   */
  onScrollToLoadFeed() {
    if (this.feedLimit < this.feedsService.feeds.length) {
      this.feedLimit = this.feedLimit + 10;
    }
  }

}
