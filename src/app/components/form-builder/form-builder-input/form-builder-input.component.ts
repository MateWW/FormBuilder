import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {FormInputModel} from '../../../models/form-input.model';
import {ConditionsModel} from '../../../models/conditions.model';
import {ConditionInterface} from '../../../interfaces/condition.interface';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-builder-input',
  templateUrl: './form-builder-input.component.html',
  styleUrls: ['./form-builder-input.component.scss']
})
export class FormBuilderInputComponent implements OnChanges, OnInit, OnDestroy {

  @Input() parentType;
  @Input() inputModel: FormInputModel;
  @Input() form: FormGroup;
  @Input() nestedId = 0;

  formGroup: FormGroup = new FormGroup({
    'conditionType': new FormControl(),
    'conditionValue': new FormControl(),
    'question': new FormControl(),
    'type': new FormControl()
  });
  formName: string;

  conditionTypeList: string[];

  constructor() {
  }

  ngOnInit() {
    this.formName = 'question' + Object.keys(this.form.controls).length;
    this.form.addControl(this.formName, this.formGroup);
  }

  ngOnChanges() {
    if (this.parentType) {
      this.conditionTypeList = Object.keys(ConditionsModel[this.parentType]);
    }
  }

  ngOnDestroy() {
    if (this.formName) {
      this.form.removeControl(this.formName);
    }
  }

  getConditionTypeName(type: string) {
    return ConditionsModel[this.parentType][type].name;
  }

  getTypesList() {
    return Object.keys(ConditionsModel);
  }

  getConditionObject(type: string, value: string): ConditionInterface {
    const condition = this.inputModel.getCondition();
    return {
      type: type || condition ? condition.type : null,
      value: value || condition ? condition.value : null
    };
  }

  addChild() {
    this.inputModel.addChild(new FormInputModel());
  }

  remove() {
    this.inputModel.destroy();
  }
}
