import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAddplaceP2Component } from './owner-addplace-p2.component';

describe('OwnerAddplaceP2Component', () => {
  let component: OwnerAddplaceP2Component;
  let fixture: ComponentFixture<OwnerAddplaceP2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerAddplaceP2Component]
    });
    fixture = TestBed.createComponent(OwnerAddplaceP2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
