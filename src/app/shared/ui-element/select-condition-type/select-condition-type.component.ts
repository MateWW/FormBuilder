import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ConditionFunctions} from '../../../interfaces/conditions-model.interface';

@Component({
  selector: 'app-select-condition-type',
  templateUrl: './select-condition-type.component.html',
  styleUrls: ['./select-condition-type.component.scss']
})
export class SelectConditionTypeComponent {
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
  @Input() conditionTypes: ConditionFunctions;

  getConditionTypes() {
    return Object.keys(this.conditionTypes);
  }

  getConditionName(key: string) {
    return this.conditionTypes[key].name;
  }

}
