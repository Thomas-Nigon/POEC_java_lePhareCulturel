import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatGroupComponent } from './creat-group.component';

describe('CreatGroupComponent', () => {
  let component: CreatGroupComponent;
  let fixture: ComponentFixture<CreatGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
