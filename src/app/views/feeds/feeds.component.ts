import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  feedType: string = 'top';
  feedsLength;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private feedsService: FeedsService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.feedType = params.get('type');

      this.fetchFeeds(this.feedType, 0, 20);
    });
  }

  /**
   * Fetch feeds and limit it to the first 20.
   */
  fetchFeeds(feedType: string, startAt: number, endAt: number) {
    this.feedsService.fetchFeeds(feedType, startAt, endAt)
      .subscribe((feeds) => {
        this.feeds = feeds;
        this.filteredFeeds = this.feeds;
        this.feedsLength = this.feedsService.totalFeedIds;
      });
  }

  /**
   * Adds 5 feeds on every scroll.
   */
  onScrollToLoadFeeds() {
    this.feedLimit += 5;
    this.route.paramMap.subscribe((params) => {
      this.feedType = params.get('type');
      this.fetchFeeds(this.feedType, 0, 20 + (this.feedLimit < this.feedsLength.length ? this.feedLimit : 0));
    });
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
