import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGuestComponent } from './dashboard-guest.component';

describe('DashboardGuestComponent', () => {
  let component: DashboardGuestComponent;
  let fixture: ComponentFixture<DashboardGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
