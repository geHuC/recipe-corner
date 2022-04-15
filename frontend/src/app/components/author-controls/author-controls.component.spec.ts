import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorControlsComponent } from './author-controls.component';

describe('AuthorControlsComponent', () => {
  let component: AuthorControlsComponent;
  let fixture: ComponentFixture<AuthorControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
