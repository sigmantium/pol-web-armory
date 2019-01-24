import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestserviceComponent } from './testservice.component';

describe('TestserviceComponent', () => {
  let component: TestserviceComponent;
  let fixture: ComponentFixture<TestserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
