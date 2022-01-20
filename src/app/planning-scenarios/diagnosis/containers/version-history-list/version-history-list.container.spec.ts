import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionHistoryListComponent } from './version-history-list.component';

describe('VersionHistoryListComponent', () => {
  let component: VersionHistoryListComponent;
  let fixture: ComponentFixture<VersionHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionHistoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
