import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCardComponent } from './filter-card.component';

describe('FilterCardComponent', () => {
  let component: FilterCardComponent;
  let fixture: ComponentFixture<FilterCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterCardComponent]
    });
    fixture = TestBed.createComponent(FilterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
