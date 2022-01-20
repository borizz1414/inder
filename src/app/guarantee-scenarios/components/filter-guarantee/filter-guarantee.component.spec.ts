import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGuaranteeComponent } from './filter-guarantee.component';

describe('FilterGuaranteeComponent', () => {
  let component: FilterGuaranteeComponent;
  let fixture: ComponentFixture<FilterGuaranteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterGuaranteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterGuaranteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
