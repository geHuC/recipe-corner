import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteBtnComponent } from './favourite-btn.component';

describe('FavouriteBtnComponent', () => {
  let component: FavouriteBtnComponent;
  let fixture: ComponentFixture<FavouriteBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
