import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {FormBuilderInputComponent} from './form-builder-input.component';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormInputModel} from '../../../models/form-input.model';
import {FormInputMock} from '../../../shared/mocks/form-input.mock';
import {Component, Input} from '@angular/core';
import {ConditionFunctions} from '../../../interfaces/conditions-model.interface';

@Component({
  selector: 'app-select-condition-type',
  template: 'test'
})
class SelectConditionTypeMockComponent {
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() conditionTypes: ConditionFunctions;
}

@Component({
  selector: 'app-input-type',
  template: 'test'
})
class InputTypeMockComponent {
  @Input() type: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
}


describe('FormBuilderInputComponent', () => {
  let component: FormBuilderInputComponent;
  let fixture: ComponentFixture<FormBuilderInputComponent>;
  const model = new FormInputModel();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        FormBuilderInputComponent,
        SelectConditionTypeMockComponent,
        InputTypeMockComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderInputComponent);
    component = fixture.componentInstance;
    model.parseJSON(FormInputMock);
    component.inputModel = model;
    component.formArray = new FormArray([]);
    component.nestedId = 1;
    component.parentType = 'boolean';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should create LocalForm and LocalFormChildren', fakeAsync(() => {
    expect(component.localForm).toBeDefined();
    expect(component.localFormChildren).toBeDefined();
  }));

  it('should emit remove', fakeAsync(() => {
    const subscription = component.remove.subscribe(() => {
      expect(true).toBeTruthy();
    });
    component.onRemove();
    tick();
    subscription.unsubscribe();
  }));

  it('should remove Child', () => {
    expect(component.inputModel.getChildren().length).toBe(2);
    component.removeChild(1);
    expect(component.inputModel.getChildren().length).toBe(1);
  });

  it('should add Child', () => {
    expect(component.inputModel.getChildren().length).toBe(2);
    component.addChild();
    expect(component.inputModel.getChildren().length).toBe(3);
  });

  it('should update value', fakeAsync(() => {
    spyOn(component.inputModel, 'setQuestion').and.callThrough();
    component.localForm.controls['question'].setValue('test change name');
    tick();
    expect(component.inputModel.setQuestion).toHaveBeenCalledWith('test change name');
  }));
});
