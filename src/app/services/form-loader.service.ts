import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {FormInputModel} from '../models/form-input.model';
import {FormInputInterface} from '../interfaces/form-input.interface';
import {FormLoaderStorage} from './form-loader.storage';


@Injectable()
export class FormLoaderService {

  private formListStream: Subject<string[]> = new Subject();
  private activeForm: string = null;
  private currentForm: FormInputModel[] = [];
  private currentFormStream: Subject<FormInputModel[]> = new Subject();

  createForm(name: string, overwrite?: boolean) {
    if (this.currentForm) {
      this.saveForm();
    }
    const saved = FormLoaderStorage.saveForm(name, [], overwrite);
    if (saved) {
      this.currentForm = [];
      this.activeForm = name;
      this.currentFormStream.next(this.currentForm);
      this.updateFormList();
      return true;
    }
    return false;
  }

  loadForm(name) {
    if (this.currentForm) {
      this.saveForm();
    }

    const form = FormLoaderStorage.getForm(name);
    if (form) {
      this.activeForm = name;
      this.currentForm = this.convertFromJSON(form);
      this.currentFormStream.next(this.currentForm);
      return true;
    }
    return false;
  }

  getActivatedFormName() {
    return this.activeForm;
  }

  saveForm() {
    if (!this.currentForm || !this.activeForm) {
      return false;
    }
    const preparedForm = this.convertToJSON(this.currentForm);
    return FormLoaderStorage.saveForm(this.activeForm, preparedForm, true);
  }

  updateForm(form: FormInputModel[]) {
    this.currentForm = form;
    this.currentFormStream.next(form);
  }

  getForm(): Observable<FormInputModel[]> {
    return this.currentFormStream.startWith(this.currentForm);
  }

  getFormJSON(): Observable<FormInputInterface[]> {
    return this.currentFormStream.startWith(this.currentForm).map((form: FormInputModel[]) => this.convertToJSON(form));
  }

  getFormList() {
    return this.formListStream.startWith(FormLoaderStorage.getFormList());
  }

  private updateFormList() {
    this.formListStream.next(FormLoaderStorage.getFormList());
  }

  private convertFromJSON(jsonForm: FormInputInterface[]): FormInputModel[] {
    const tempChildren = [];
    jsonForm.forEach((formInput: FormInputInterface) => {
      const model = new FormInputModel();
      model.parseJSON(formInput);
      tempChildren.push(model);
    });
    return tempChildren;
  }

  private convertToJSON(form: FormInputModel[]): FormInputInterface[] {
    const tempChildren = [];
    form.forEach((formModel: FormInputModel) => {
      const json = formModel.getJSON();
      if (json) {
        tempChildren.push(json);
      }
    });
    return JSON.parse(JSON.stringify(tempChildren));
  }
}
