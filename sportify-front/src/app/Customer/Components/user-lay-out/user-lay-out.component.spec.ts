import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLayOutComponent } from './user-lay-out.component';

describe('UserLayOutComponent', () => {
  let component: UserLayOutComponent;
  let fixture: ComponentFixture<UserLayOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLayOutComponent]
    });
    fixture = TestBed.createComponent(UserLayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
