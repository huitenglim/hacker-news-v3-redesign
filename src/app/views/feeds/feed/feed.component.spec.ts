import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MomentModule } from 'ngx-moment';

import { FeedComponent } from './feed.component';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedComponent ],
      imports: [
        MomentModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display feed items accordingly', () => {
    component.feed = {
      title: 'Fake news 1',
      url: 'https://fake-news-1.com',
      by: 'John Doe',
      time: 1577840461,
      score: 20,
      descendants: 10
    }
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement;
    const title = nativeElement.querySelector('.feed-title').textContent;
    const by = nativeElement.querySelector('.feed-user').textContent;
    const score = nativeElement.querySelector('.feed-score').textContent;
    const time = nativeElement.querySelector('.feed-time').textContent;
    const comments = nativeElement.querySelector('.feed-badge').textContent;
    expect(title).toEqual(' Fake news 1 ');
    expect(by).toEqual('John Doe');
    expect(score).toEqual(' 20 points');
    expect(time).toEqual('3 years ago');
    expect(comments).toEqual(' 10 comments ');
  });

  it('#goToLink() should open the link in new tab', () => {
    const windowOpenSpy = spyOn(window, 'open');
    const testUrl = 'https://www.google.com';
    component.goToLink(testUrl);
    expect(windowOpenSpy.calls.count()).toEqual(1);
    expect(windowOpenSpy.calls.allArgs()[0][0]).toEqual(testUrl);
  });
});
