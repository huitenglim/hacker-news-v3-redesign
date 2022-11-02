import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MomentModule } from 'ngx-moment';
import { of } from 'rxjs';

import { FeedsComponent } from './feeds.component';
import { FeedComponent } from './feed/feed.component';

import { FeedsService } from '../../services/feeds.service';

describe('FeedsComponent', () => {
  let component: FeedsComponent;
  let fixture: ComponentFixture<FeedsComponent>;
  let inputElement: HTMLInputElement;
  let feedsServiceMock = jasmine.createSpyObj('FeedsService', ['fetchFeeds', 'fetchFeed']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FeedsComponent,
        FeedComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        InfiniteScrollModule,
        MomentModule
      ],
      providers: [{
        provide: FeedsService,
        useValue: feedsServiceMock
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedsComponent);
    component = fixture.componentInstance;
    inputElement = <HTMLInputElement> fixture.debugElement.nativeElement.querySelector('INPUT');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit() should get feeds from the service when page loads', () => {
    feedsServiceMock.fetchFeeds.and.returnValue(of([
      {
        title: 'Fake news 1',
        url: 'https://fake-news-1.com',
        by: 'John Doe',
        time: 1577840461,
        score: 20,
        descendants: 10
      },
      {
        title: 'Fake news 2',
        url: 'https://fake-news-2.com',
        by: 'Jane Doe',
        time: 1622851261,
        score: 30,
        descendants: 3
      }
    ]));
    component.ngOnInit();
    expect(component.feeds.length).toEqual(2);
    expect(component.filteredFeeds.length).toEqual(2);
  });

  it('#onScrollToLoadFeeds() should add more feeds per scroll if there are more feeds available in the queue', () => {
    feedsServiceMock.fetchFeeds.and.returnValue(of([
      {
        title: 'Fake news 4',
        url: 'https://fake-news-4.com',
        by: 'Timothy',
        time: 1622851261,
        score: 30,
        descendants: 3
      },
      {
        title: 'Fake news 5',
        url: 'https://fake-news-5.com',
        by: 'Cynthia',
        time: 1622851261,
        score: 30,
        descendants: 3
      },
      {
        title: 'Fake news 6',
        url: 'https://fake-news-6.com',
        by: 'Lucy',
        time: 1577840461,
        score: 20,
        descendants: 10
      },
      {
        title: 'Fake news 7',
        url: 'https://fake-news-7.com',
        by: 'Alan',
        time: 1622851261,
        score: 30,
        descendants: 3
      },
      {
        title: 'Fake news 8',
        url: 'https://fake-news-8.com',
        by: 'Will Smith',
        time: 1622851261,
        score: 30,
        descendants: 3
      }
    ]));
    component.feedsLength = 20;
    component.onScrollToLoadFeeds();
    expect(component.feeds.length).toEqual(5);
  });

  it('#search() should display the feeds based', () => {
    component.feeds = [
      {
        title: 'Fake news 4',
        url: 'https://fake-news-4.com',
        by: 'Timothy',
        time: 1622851261,
        score: 30,
        descendants: 3
      },
      {
        title: 'Fake news 5',
        url: 'https://fake-news-5.com',
        by: 'Cynthia',
        time: 1622851261,
        score: 30,
        descendants: 3
      },
      {
        title: 'Fake news 6',
        url: 'https://fake-news-6.com',
        by: 'Lucy',
        time: 1577840461,
        score: 20,
        descendants: 10
      },
      {
        title: 'Fake news 7',
        url: 'https://fake-news-7.com',
        by: 'Alan',
        time: 1622851261,
        score: 30,
        descendants: 3
      },
      {
        title: 'Fake news 8',
        url: 'https://fake-news-8.com',
        by: 'Will Smith',
        time: 1622851261,
        score: 30,
        descendants: 3
      }
    ];
    inputElement.value = 'Will';
    const event = new KeyboardEvent('keydown', { key: 'C' });
    inputElement.dispatchEvent(event);
    component.search('Will');
    expect(component.filteredFeeds.length).toEqual(1);
  });
});
