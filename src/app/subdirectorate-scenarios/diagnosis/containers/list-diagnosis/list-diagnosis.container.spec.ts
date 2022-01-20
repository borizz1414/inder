import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDiagnosisContainer } from './list-diagnosis.container';

describe('ListDiagnosisContainer', () => {
  let component: ListDiagnosisContainer;
  let fixture: ComponentFixture<ListDiagnosisContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDiagnosisContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDiagnosisContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
