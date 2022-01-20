import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrensGameComponent } from './childrens-game.component';

describe('ChildrensGameComponent', () => {
  let component: ChildrensGameComponent;
  let fixture: ComponentFixture<ChildrensGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildrensGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrensGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
