import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisContainer } from './diagnosis.container';

describe('DiagnosisContainer', () => {
  let component: DiagnosisContainer;
  let fixture: ComponentFixture<DiagnosisContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosisContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
