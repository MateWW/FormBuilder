import {Component, HostBinding, Input, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FormInputInterface} from '../../../interfaces/form-input.interface';
import {ConditionsModel} from '../../../models/conditions.model';

@Component({
  selector: 'app-preview-input',
  templateUrl: './preview-input.component.html',
  styleUrls: ['./preview-input.component.scss']
})
export class PreviewInputComponent implements OnInit, OnChanges {

  @Input() formGroup: FormGroup;
  @Input() inputJSON: FormInputInterface;
  @Input() parentValue: any;
  @Input() parentType: string;

  @HostBinding('class.visible') visible;

  localFormGroup = new FormGroup({
    answer: new FormControl()
  });

  private static getKey() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  constructor() {
  }

  ngOnInit() {
    this.formGroup.addControl(PreviewInputComponent.getKey(), this.localFormGroup);
    if (this.inputJSON.type === 'boolean') {
      this.localFormGroup.setValue({'answer': 'true'});
    }
  }

  ngOnChanges() {
    if (!this.inputJSON.condition || !this.inputJSON.condition.value || !this.inputJSON.condition.type || !this.parentType) {
      this.visible = !!this.parentValue;
    } else {
      this.visible = this.getCompareFunction(this.parentValue, this.inputJSON.condition.value);
    }
  }

  private getCompareFunction(parentValue, localCondition) {
    const compareMethods = ConditionsModel[this.parentType];
    if (!compareMethods || !compareMethods[this.inputJSON.condition.type]) {
      throw new Error('Missing compare function add it to condition.model.ts');
    }
    return compareMethods[this.inputJSON.condition.type].func(localCondition, parentValue);
  }

}
