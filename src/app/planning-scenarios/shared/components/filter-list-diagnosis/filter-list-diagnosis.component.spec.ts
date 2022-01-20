import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterListDiagnosisComponent } from './filter-list-diagnosis.component';

describe('FilterListDiagnosisComponent', () => {
  let component: FilterListDiagnosisComponent;
  let fixture: ComponentFixture<FilterListDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterListDiagnosisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterListDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
