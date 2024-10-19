import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeMyPlacesComponent } from './see-my-places.component';

describe('SeeMyPlacesComponent', () => {
  let component: SeeMyPlacesComponent;
  let fixture: ComponentFixture<SeeMyPlacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeMyPlacesComponent]
    });
    fixture = TestBed.createComponent(SeeMyPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
