import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeFormComponent } from './cumulative-form.component';

describe('CumulativeFormComponent', () => {
  let component: CumulativeFormComponent;
  let fixture: ComponentFixture<CumulativeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CumulativeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulativeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
