import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectConditionTypeComponent } from './select-condition-type.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ConditionsModel} from '../../../models/conditions.model';
import {By} from '@angular/platform-browser';

describe('SelectConditionTypeComponent', () => {
  let component: SelectConditionTypeComponent;
  let fixture: ComponentFixture<SelectConditionTypeComponent>;
  const formGroup = new FormGroup({
    'testName': new FormControl()
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ SelectConditionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectConditionTypeComponent);
    component = fixture.componentInstance;
    component.formGroup = formGroup;
    component.controlName = 'testName';
    component.conditionTypes = ConditionsModel['number'];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render select options', () => {
    const elements = fixture.debugElement.queryAll(By.css('option'));
    expect(elements.length).toBe(component.getConditionTypes().length);
  });

  it('should return type name', () => {
    const key = component.getConditionTypes()[0];
    expect(component.getConditionName(key)).toBe(ConditionsModel['number'][key].name);
  });
});
