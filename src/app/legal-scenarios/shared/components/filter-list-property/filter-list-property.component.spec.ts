import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterListPropertyComponent } from './filter-list-property.component';

describe('FilterListPropertyComponent', () => {
  let component: FilterListPropertyComponent;
  let fixture: ComponentFixture<FilterListPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterListPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterListPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
