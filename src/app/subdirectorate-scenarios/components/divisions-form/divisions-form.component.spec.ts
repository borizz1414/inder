import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionsFormComponent } from './divisions-form.component';

describe('DivisionsFormComponent', () => {
  let component: DivisionsFormComponent;
  let fixture: ComponentFixture<DivisionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
