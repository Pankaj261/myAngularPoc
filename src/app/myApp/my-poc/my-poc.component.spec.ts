import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPOCComponent } from './my-poc.component';

describe('MyPOCComponent', () => {
  let component: MyPOCComponent;
  let fixture: ComponentFixture<MyPOCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPOCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
