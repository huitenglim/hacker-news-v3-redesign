import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { mergeMap, map, tap } from 'rxjs/operators';

import { Feed } from '../models/feed.model';

export const BASE_API_URL = 'https://hacker-news.firebaseio.com/v0/';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {
  totalFeedIds;

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
   * Then limit the number of ids returned from the api to prevent this.fetchFeed
   * from fetching all feeds at once based on the actual amount of ids element during
   * subscription of data in the component.
   *
   * @param feedType - Feed type (top | new | best).
   * @param startAt - Start position of the array.
   * @param endAt - End position of the array.
   * @return - An array of feed item ids.
   */
  fetchFeeds(feedType: string, startAt: number, endAt: number) {
    return this.http.get(`${BASE_API_URL}/${feedType}stories.json`)
      .pipe(
        tap((data) => this.totalFeedIds = data),
        map(data => Object.values(data).slice(startAt, endAt)),
        mergeMap((ids) =>
          forkJoin(Object.values(ids).map((id) => this.fetchFeed(id)))
        )
      );
  }
}
