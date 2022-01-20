import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecreationalNucleusComponent } from './recreational-nucleus.component';

describe('RecreationalNucleusComponent', () => {
  let component: RecreationalNucleusComponent;
  let fixture: ComponentFixture<RecreationalNucleusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecreationalNucleusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecreationalNucleusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
