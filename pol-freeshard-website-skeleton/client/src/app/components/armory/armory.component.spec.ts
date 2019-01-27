import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmoryComponent } from './armory.component';

describe('ArmoryComponent', () => {
  let component: ArmoryComponent;
  let fixture: ComponentFixture<ArmoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
