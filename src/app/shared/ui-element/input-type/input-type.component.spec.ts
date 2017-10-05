import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTypeComponent } from './input-type.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('InputTypeComponent', () => {
  let component: InputTypeComponent;
  let fixture: ComponentFixture<InputTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ InputTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTypeComponent);
    component = fixture.componentInstance;
    component.controlName = 'testName';
    component.formGroup = new FormGroup({
      'testName': new FormControl()
    });
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render input', () => {
    const element = fixture.debugElement.queryAll(By.css('input'));
    expect(element.length).toBe(1);
  });

  it('should render select', () => {
    component.type = 'boolean';
    fixture.detectChanges();
    const element = fixture.debugElement.queryAll(By.css('select'));
    expect(element.length).toBe(1);
  });
});
