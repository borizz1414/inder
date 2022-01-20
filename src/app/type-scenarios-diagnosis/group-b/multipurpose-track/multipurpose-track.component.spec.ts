import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipurposeTrackComponent } from './multipurpose-track.component';

describe('MultipurposeTrackComponent', () => {
  let component: MultipurposeTrackComponent;
  let fixture: ComponentFixture<MultipurposeTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipurposeTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipurposeTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
