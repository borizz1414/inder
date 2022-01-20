import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeListContainer } from './guarantee-list.container';

describe('GuaranteeListContainer', () => {
  let component: GuaranteeListContainer;
  let fixture: ComponentFixture<GuaranteeListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuaranteeListContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
