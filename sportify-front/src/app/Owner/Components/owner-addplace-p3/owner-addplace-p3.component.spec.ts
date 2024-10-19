import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAddplaceP3Component } from './owner-addplace-p3.component';

describe('OwnerAddplaceP3Component', () => {
  let component: OwnerAddplaceP3Component;
  let fixture: ComponentFixture<OwnerAddplaceP3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerAddplaceP3Component]
    });
    fixture = TestBed.createComponent(OwnerAddplaceP3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
