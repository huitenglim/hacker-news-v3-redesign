import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Feed } from '../../../models/feed.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {
  @Input() feed: Feed;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Opens the feed url in link new tab.
   *
   * @param url - The url from feed
   */
  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
