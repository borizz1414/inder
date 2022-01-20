import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterventionContainer } from './add-intervention.container';

describe('AddInterventionContainer', () => {
  let component: AddInterventionContainer;
  let fixture: ComponentFixture<AddInterventionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInterventionContainer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterventionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
