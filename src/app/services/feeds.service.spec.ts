import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FeedsService } from './feeds.service';

describe('FeedsService', () => {
  let service: FeedsService;
  let httpClientMock = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [{
        provide: HttpClient,
        useValue: httpClientMock
      }]
    });
    service = TestBed.inject(FeedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the individual feed item based on the number of feed ids from hacker news stories api', (done) => {
    httpClientMock.get.and.returnValue(new Observable(
      (o) => {
        o.next([100]);
      }));
    service.fetchFeeds('top', 0, 2)
      .subscribe((data)=> {
        expect(data).toEqual([{
          title: 'Fake news 1',
          url: 'https://fake-news-1.com',
          by: 'John Doe',
          time: 1577840461,
          score: 20,
          descendants: 10
        }]);
        done();
      });
    expect(httpClientMock.get).toHaveBeenCalledTimes(2);

    httpClientMock.get.and.returnValue(new Observable(
      (o) => {
        o.next({
            title: 'Fake news 1',
            url: 'https://fake-news-1.com',
            by: 'John Doe',
            time: 1577840461,
            score: 20,
            descendants: 10
          });
      }));
    service.fetchFeed(123456)
      .subscribe((data)=> {
        expect(data).toEqual(
          {
            title: 'Fake news 1',
            url: 'https://fake-news-1.com',
            by: 'John Doe',
            time: 1577840461,
            score: 20,
            descendants: 10
          }
        );
        done();
      });
    expect(httpClientMock.get).toHaveBeenCalledTimes(3);
  });
});
