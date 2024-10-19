/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Customer_see_place_scheduleComponent } from './customer_see_place_schedule.component';

describe('Customer_see_place_scheduleComponent', () => {
  let component: Customer_see_place_scheduleComponent;
  let fixture: ComponentFixture<Customer_see_place_scheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Customer_see_place_scheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Customer_see_place_scheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
