import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMessageCardComponent } from './single-message-card.component';

describe('SingleMessageCardComponent', () => {
  let component: SingleMessageCardComponent;
  let fixture: ComponentFixture<SingleMessageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleMessageCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleMessageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
