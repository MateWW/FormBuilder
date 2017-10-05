import {FormInputInterface} from '../interfaces/form-input.interface';

export class FormLoaderStorage {

  private static isLocalStorageAvailable = !!Storage;
  private static prefix = 'FB_';

  static getFormList() {
    if (!FormLoaderStorage.isLocalStorageAvailable) {
      return [];
    }
    const formList = [];

    for (const key in localStorage) {
      if (FormLoaderStorage.isCorrectSavedForm(key)) {
        const name = key.split('FB_').join('');
        formList.push(name.split('_').join(' '));
      }
    }
    return formList;
  }

  static getForm(name: string) {
    if (!FormLoaderStorage.isLocalStorageAvailable) {
      return null;
    }
    const key = FormLoaderStorage.getKey(name),
          savedForm: string = localStorage.getItem(key);
    return savedForm ? JSON.parse(savedForm) : null;
  }

  static saveForm(name: string, form: FormInputInterface[], overwrite = false) {
    const key = FormLoaderStorage.getKey(name);
    if (!FormLoaderStorage.isLocalStorageAvailable || (!overwrite && localStorage.getItem(key))) {
      return false;
    }
    localStorage.setItem(key, JSON.stringify(form));
    return true;
  }


  private static isCorrectSavedForm(key) {
    try {
      const nameRegExp = new RegExp('^' + FormLoaderStorage.prefix + '.+$', 'g'),
            form: FormInputInterface[] = JSON.parse(localStorage.getItem(key));
      if (form instanceof Array && nameRegExp.exec(key) !== null) {
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  private static getKey(name: string) {
    return FormLoaderStorage.prefix + name.split(' ').join('_');
  }
}
