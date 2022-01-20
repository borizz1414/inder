import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailScenarioComponent } from './detail-scenario.component';

describe('DetailScenarioComponent', () => {
  let component: DetailScenarioComponent;
  let fixture: ComponentFixture<DetailScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
