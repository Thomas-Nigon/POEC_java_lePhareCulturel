import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBlockComponent } from './top-block.component';

describe('TopBlockComponent', () => {
  let component: TopBlockComponent;
  let fixture: ComponentFixture<TopBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
