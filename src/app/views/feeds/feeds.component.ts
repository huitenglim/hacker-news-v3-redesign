import { Component, OnInit } from '@angular/core';
import { FeedsService } from '../../services/feeds.service';
import { Feed } from '../../models/feed.model';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  feeds:Array<Feed> = [];
  feedLimit: number = 0;
  isSorted = false;
  filteredFeeds: any;
  searchValue: string = '';

  constructor(private feedsService: FeedsService) { }

  ngOnInit(): void {
    this.fetchFeeds('top', 0, 20);
  }

  /**
   * Fetch feeds and limit it to the first 20.
   */
  fetchFeeds(feedType: string, startAt: number, endAt: number) {
    this.feedsService.fetchFeeds(feedType, startAt, endAt)
      .subscribe((feeds) => {
        this.feeds = feeds;
        this.filteredFeeds = this.feeds;
      });
  }

  /**
   * Adds 5 feeds on every scroll.
   */
  onScrollToLoadFeed() {
    this.feedLimit += 5;
    this.fetchFeeds('top', 0, 20 + this.feedLimit);
  }

  /**
   * Search through the feed `title` and `by` value.
   * When there is no input value, display the original results.
   *
   * @param value - The input search value.
   */
  search(value: string) {
    if (value) {
      this.filteredFeeds = this.feeds.filter((feed)=> {
        if (feed.title.toLowerCase().indexOf(value.toLowerCase().trim()) >= 0 || feed.by.toLowerCase().indexOf(value.toLowerCase().trim()) >= 0) {
          return this.filteredFeeds;
        }
      });
    }
    else {
      this.filteredFeeds = this.feeds;
    }
  }
}
