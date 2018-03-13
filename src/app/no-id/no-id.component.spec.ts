import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoIdComponent } from './no-id.component';

describe('NoIdComponent', () => {
  let component: NoIdComponent;
  let fixture: ComponentFixture<NoIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
