import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormInputModel} from '../../../models/form-input.model';
import {ConditionsModel} from '../../../models/conditions.model';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-builder-input',
  templateUrl: './form-builder-input.component.html',
  styleUrls: ['./form-builder-input.component.scss']
})
export class FormBuilderInputComponent implements OnInit, OnDestroy {

  @Input() parentType;
  @Input() inputModel: FormInputModel;
  @Input() formArray: FormArray;
  @Input() nestedId = 0;

  @Output() remove = new EventEmitter();

  localForm: FormGroup;
  localFormChildren: FormArray;
  private formIndex: number;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    this.updateModel();
  }

  ngOnDestroy() {
    if (this.formIndex) {
      this.formArray.removeAt(this.formIndex);
    }
  }

  getConditionTypes() {
    return ConditionsModel[this.parentType];
  }

  getTypes() {
    return Object.keys(ConditionsModel);
  }

  addChild() {
    this.inputModel.addChild(new FormInputModel());
  }

  onRemove() {
    this.remove.emit();
  }

  removeChild(index) {
    this.inputModel.removeChild(index);
  }

  private createForm() {
    this.localFormChildren = this.formBuilder.array([]);
    this.localForm = this.formBuilder.group({
      'conditionType': new FormControl(this.inputModel.getCondition().type),
      'conditionValue': new FormControl(this.inputModel.getCondition().value),
      'question': new FormControl(this.inputModel.getQuestion()),
      'type': new FormControl(this.inputModel.getType()),
      'children': this.localFormChildren
    });
    this.formIndex = this.formArray.length;
    this.formArray.push(this.localForm);
  }

  private updateModel() {
    this.localForm.valueChanges.subscribe((value) => {
      this.inputModel.setCondition({
        type: value.conditionType,
        value: value.conditionValue
      });
      this.inputModel.setType(value.type);
      this.inputModel.setQuestion(value.question);
    });
  }

}
