import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionsFormComponent } from './interventions-form.component';

describe('InterventionsFormComponent', () => {
  let component: InterventionsFormComponent;
  let fixture: ComponentFixture<InterventionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterventionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
