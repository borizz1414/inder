import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkateTrackComponent } from './skate-track.component';

describe('SkateTrackComponent', () => {
  let component: SkateTrackComponent;
  let fixture: ComponentFixture<SkateTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkateTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkateTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
