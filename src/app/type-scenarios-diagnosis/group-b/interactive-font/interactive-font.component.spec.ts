import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveFontComponent } from './interactive-font.component';

describe('InteractiveFontComponent', () => {
  let component: InteractiveFontComponent;
  let fixture: ComponentFixture<InteractiveFontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractiveFontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
