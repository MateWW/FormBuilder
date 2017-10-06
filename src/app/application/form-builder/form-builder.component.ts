import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {FormInputModel} from '../../models/form-input.model';
import {FormLoaderService} from '../../services/form-loader.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, AfterViewInit {

  form: FormArray;
  formModel: FormInputModel[];

  autoSave = false;

  constructor(private formLoader: FormLoaderService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.array([]);
    this.formLoader.getForm().subscribe((formModel: FormInputModel[]) => {
      this.formModel = formModel;
    });
  }

  ngAfterViewInit() {
    this.form.valueChanges.debounceTime(300).subscribe(() => {
      this.update();
      if (this.autoSave) {
        this.formLoader.saveForm();
      }
    });
  }

  addNew() {
    if (this.getFormName()) {
      this.formModel.push(new FormInputModel());
      this.save();
    }
  }

  save() {
    if (this.getFormName()) {
      this.update();
      this.formLoader.saveForm();
    }
  }

  removeChildren(index) {
    this.formModel.splice(index, 1);
    this.update();
  }

  update() {
    this.formLoader.updateForm(this.formModel);
  }

  getFormName() {
    return this.formLoader.getActivatedFormName();
  }

  changeAutoSave() {
    this.autoSave = !this.autoSave;
    this.save();
  }
}
