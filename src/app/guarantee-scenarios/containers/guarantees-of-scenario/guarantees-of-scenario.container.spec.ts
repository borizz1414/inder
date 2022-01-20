import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteesOfScenarioComponent } from './guarantees-of-scenario.component';

describe('GuaranteesOfScenarioComponent', () => {
  let component: GuaranteesOfScenarioComponent;
  let fixture: ComponentFixture<GuaranteesOfScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuaranteesOfScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteesOfScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
