import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuaranteeContainer } from './add-guarantee.container';

describe('AddGuaranteeContainer', () => {
  let component: AddGuaranteeContainer;
  let fixture: ComponentFixture<AddGuaranteeContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGuaranteeContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuaranteeContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
