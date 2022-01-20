import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScenariosContainer } from './list-scenarios.container';

describe('ListScenariosComponent', () => {
  let component: ListScenariosContainer;
  let fixture: ComponentFixture<ListScenariosContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListScenariosContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScenariosContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
