import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDiagnosisComponent } from './detail-diagnosis.component';

describe('DetailDiagnosisComponent', () => {
  let component: DetailDiagnosisComponent;
  let fixture: ComponentFixture<DetailDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDiagnosisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
