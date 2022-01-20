import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddGuaranteeComponent } from './form-add-guarantee.component';

describe('FormAddGuaranteeComponent', () => {
  let component: FormAddGuaranteeComponent;
  let fixture: ComponentFixture<FormAddGuaranteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddGuaranteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddGuaranteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
