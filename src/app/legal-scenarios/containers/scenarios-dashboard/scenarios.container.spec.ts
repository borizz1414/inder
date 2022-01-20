import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenariosContainer } from './scenarios.container';

describe('ScenariosContainer', () => {
  let component: ScenariosContainer;
  let fixture: ComponentFixture<ScenariosContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScenariosContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenariosContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
