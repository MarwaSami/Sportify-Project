import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAddplaceP4Component } from './owner-addplace-p4.component';

describe('OwnerAddplaceP4Component', () => {
  let component: OwnerAddplaceP4Component;
  let fixture: ComponentFixture<OwnerAddplaceP4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerAddplaceP4Component]
    });
    fixture = TestBed.createComponent(OwnerAddplaceP4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
