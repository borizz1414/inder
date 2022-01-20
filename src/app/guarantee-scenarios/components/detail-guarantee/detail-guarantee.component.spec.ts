import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGuaranteeComponent } from './detail-guarantee.component';

describe('DetailGuaranteeComponent', () => {
  let component: DetailGuaranteeComponent;
  let fixture: ComponentFixture<DetailGuaranteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailGuaranteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGuaranteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
