import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerStatisticsComponent } from './server-statistics.component';

describe('ServerStatisticsComponent', () => {
  let component: ServerStatisticsComponent;
  let fixture: ComponentFixture<ServerStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
