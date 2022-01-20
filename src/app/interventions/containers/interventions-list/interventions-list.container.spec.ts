import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionsListContainer } from './interventions-list.container';

describe('InterventionsListContainer', () => {
  let component: InterventionsListContainer;
  let fixture: ComponentFixture<InterventionsListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterventionsListContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionsListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
