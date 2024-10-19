/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Booking3Component } from './booking3.component';

describe('Booking3Component', () => {
  let component: Booking3Component;
  let fixture: ComponentFixture<Booking3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Booking3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Booking3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
