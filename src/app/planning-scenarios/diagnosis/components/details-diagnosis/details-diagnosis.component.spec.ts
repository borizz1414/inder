import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDiagnosisComponent } from './details-diagnosis.component';

describe('DetailsDiagnosisComponent', () => {
  let component: DetailsDiagnosisComponent;
  let fixture: ComponentFixture<DetailsDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDiagnosisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
