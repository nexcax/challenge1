import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedFormsComponent } from './nested-forms.component';

describe('NestedFormsComponent', () => {
  let component: NestedFormsComponent;
  let fixture: ComponentFixture<NestedFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
