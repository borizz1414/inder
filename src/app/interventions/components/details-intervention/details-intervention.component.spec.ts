import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInterventionComponent } from './details-intervention.component';

describe('DetailsInterventionComponent', () => {
  let component: DetailsInterventionComponent;
  let fixture: ComponentFixture<DetailsInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsInterventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
