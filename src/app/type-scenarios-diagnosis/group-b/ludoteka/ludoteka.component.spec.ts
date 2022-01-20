import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LudotekaComponent } from './ludoteka.component';

describe('LudotekaComponent', () => {
  let component: LudotekaComponent;
  let fixture: ComponentFixture<LudotekaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LudotekaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LudotekaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
