import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersioningContainer } from './versioning.container';

describe('VersioningContainer', () => {
  let component: VersioningContainer;
  let fixture: ComponentFixture<VersioningContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersioningContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersioningContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
