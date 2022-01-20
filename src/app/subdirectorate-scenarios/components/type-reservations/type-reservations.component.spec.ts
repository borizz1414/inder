import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeReservationsComponent } from './type-reservations.component';

describe('TypeReservationsComponent', () => {
  let component: TypeReservationsComponent;
  let fixture: ComponentFixture<TypeReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
