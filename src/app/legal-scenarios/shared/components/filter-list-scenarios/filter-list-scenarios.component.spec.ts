import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterListScenariosComponent } from './filter-list-scenarios.component';

describe('FilterListScenariosComponent', () => {
  let component: FilterListScenariosComponent;
  let fixture: ComponentFixture<FilterListScenariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterListScenariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterListScenariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
