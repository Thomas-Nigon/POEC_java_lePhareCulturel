import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPageEventCardComponent } from './event-page-event-card.component';

describe('EventPageEventCardComponent', () => {
  let component: EventPageEventCardComponent;
  let fixture: ComponentFixture<EventPageEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventPageEventCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventPageEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
