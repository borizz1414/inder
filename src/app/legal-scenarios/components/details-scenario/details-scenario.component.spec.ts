import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsScenarioComponent } from './details-scenario.component';

describe('DetailsScenarioComponent', () => {
  let component: DetailsScenarioComponent;
  let fixture: ComponentFixture<DetailsScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
