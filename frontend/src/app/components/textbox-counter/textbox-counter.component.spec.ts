import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxCounterComponent } from './textbox-counter.component';

describe('TextboxCounterComponent', () => {
  let component: TextboxCounterComponent;
  let fixture: ComponentFixture<TextboxCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextboxCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
