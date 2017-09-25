import {Injectable} from '@angular/core';
import {SavedFormInterface} from '../interfaces/saved-form.interface';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';
import {FormInputModel} from '../models/form-input.model';
import {FormInputInterface} from '../interfaces/form-input.interface';

@Injectable()
export class FormLoaderService {

  private static prefix = 'FB_';

  private isLocalStorageActive = false;

  private formList: string[] = [];
  private formListStream: Subject<string[]> = new Subject();

  private currentForm: SavedFormInterface;
  private currentFormStream: Subject<SavedFormInterface> = new Subject();

  constructor() {
    this.checkLocalStorage();
    this.loadFormList();
  }

  createForm(name: string, overwrite?: boolean) {
    this.loadFormList();
    if (this.formList.find((formName: string) => (formName === name)) && !overwrite) {
      return false;
    }
    if (this.currentForm) {
      this.saveForm();
    }
    this.currentForm = this.convertFromJSON({name: name, form: []});
    this.currentFormStream.next(this.currentForm);
    this.saveForm();
    this.loadFormList();
    return true;
  }

  loadForm(name) {
    this.loadFormList();
    if (!this.formList.find((formName: string) => (formName === name))) {
      return false;
    }
    const formKey = FormLoaderService.prefix + name.split(' ').join(''),
      form = this.getFormFromLocalStorage(formKey);
    if (this.currentForm) {
      this.saveForm();
    }
    this.currentForm = this.convertFromJSON(form);
    this.currentFormStream.next(this.currentForm);
    return true;
  }

  getCurrentFormName() {
    if (this.currentForm) {
      return this.currentForm.name;
    }
    return null;
  }

  saveForm() {
    if (!this.currentForm) {
      return false;
    }
    const preparedForm = this.convertToJSON(this.currentForm);
    return this.saveFormInLocalStorage(preparedForm);
  }

  getForm() {
    if (this.currentForm) {
      return this.currentFormStream.startWith(this.currentForm);
    }
    return this.currentFormStream.asObservable();
  }

  getFormList() {
    this.loadFormList();
    return this.formListStream.startWith(this.formList);
  }

  private checkLocalStorage() {
    this.isLocalStorageActive = !!Storage;
  }

  private loadFormList() {
    if (!this.isLocalStorageActive) {
      return;
    }
    this.formList = [];

    for (const key in localStorage) {
      if (typeof  key === 'string' && this.isCorrectSavedForm(key)) {
        const name = JSON.parse(localStorage.getItem(key)).name;
        this.formList.push(name);
      }
    }
    this.formListStream.next(this.formList);
  }

  private isCorrectSavedForm(key) {
    if (!this.isExist(key)) {
      return false;
    }
    try {
      const form: SavedFormInterface = JSON.parse(localStorage.getItem(key));
      if (key.slice(0, 3) !== FormLoaderService.prefix) {
        return false;
      } else if (!form) {
        return false;
      } else if (form.name.split(' ').join('') !== key.slice(FormLoaderService.prefix.length, key.length)) {
        return false;
      } else if (!(form.form instanceof Array)) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  private isExist(key) {
    if (!this.isLocalStorageActive) {
      return false;
    }
    return !!localStorage.getItem(key);
  }

  private getFormFromLocalStorage(key: string) {
    if (!this.isLocalStorageActive) {
      return false;
    }
    const savedForm: string = localStorage.getItem(key);
    return savedForm ? JSON.parse(savedForm) : null;
  }

  private saveFormInLocalStorage(form: SavedFormInterface) {
    if (!this.isLocalStorageActive) {
      return false;
    }
    const key = FormLoaderService.prefix + form.name.split(' ').join('');
    return localStorage.setItem(key, JSON.stringify(form));
  }

  private convertFromJSON(jsonForm: SavedFormInterface): SavedFormInterface {
    const tempChildren = [];
    jsonForm.form.forEach((formInput: FormInputInterface) => {
      const model = new FormInputModel();
      model.parseJSON(formInput);
      tempChildren.push(model);
    });
    return Object.assign({}, jsonForm, {formModels: tempChildren});
  }

  private convertToJSON(form: SavedFormInterface): SavedFormInterface {
    const tempChildren = [];
    form.formModels.forEach((formModel: FormInputModel) => {
      tempChildren.push(formModel.getJSON());
    });
    return {name: form.name, form: tempChildren};
  }
}
