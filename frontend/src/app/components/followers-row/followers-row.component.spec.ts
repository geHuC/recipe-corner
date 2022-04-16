import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersRowComponent } from './followers-row.component';

describe('FollowersRowComponent', () => {
  let component: FollowersRowComponent;
  let fixture: ComponentFixture<FollowersRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowersRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
