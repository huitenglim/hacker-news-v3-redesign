import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Feed } from '../models/feed.model';

export const BASE_API_URL = 'https://hacker-news.firebaseio.com/v0/';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  feeds: Array<Observable<Feed>>;

  constructor(private http: HttpClient) { }

  /**
   * Fetch individual feed based on the feed id.
   *
   * @param feedId - feed id.
   * @return - A feed item observable object.
   */
  fetchFeed(feedId: number) {
    return this.http.get<Feed>(`${BASE_API_URL}item/${feedId}.json`);
  }

  /**
   * Fetch feeds by type from hacker news api.
   * Store the array of feed item observable objects in `this.feeds`.
   *
   * @param feedType - feed type (top | new | best).
   * @return - An array of feed item ids.
   */
  fetchFeeds(feedType: string) {
    return this.http.get(`${BASE_API_URL}/${feedType}stories.json`)
      .pipe(tap({
        next: ((res: Array<number>) => {
          this.feeds = res.map((feedId: number) => this.fetchFeed(feedId));
        })
      }));
  }
}
