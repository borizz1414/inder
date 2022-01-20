import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInterventionComponent } from './form-intervention.component';

describe('FormInterventionComponent', () => {
  let component: FormInterventionComponent;
  let fixture: ComponentFixture<FormInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInterventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
