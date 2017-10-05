import {FormInputMock} from '../shared/mocks/form-input.mock';
import {FormLoaderStorage} from './form-loader.storage';

describe("FormLoaderStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get form list', () => {
    localStorage.setItem('FB_test', JSON.stringify([FormInputMock]));
    localStorage.setItem('FB_second_correct', JSON.stringify([FormInputMock]));
    localStorage.setItem('FB_it_should_be_skipped', 'sth');

    const list = FormLoaderStorage.getFormList();

    expect(list.length).toEqual(2);
  });

  it('should load form', () => {
    localStorage.setItem('FB_get_sth', JSON.stringify([FormInputMock]));

    const form = FormLoaderStorage.getForm('get sth');

    expect(form).toBeTruthy();
    expect(form instanceof Array).toBeTruthy();
  });

  it('should save form', () => {
    const formSaved = FormLoaderStorage.saveForm('saved', [FormInputMock]);

    expect(formSaved).toBeTruthy();
    expect(typeof localStorage.getItem('FB_saved')).toBe('string');
  });

  it('should overwrite form', () => {
    localStorage.setItem('FB_harder_saved_form', 'sth');
    let formSaved = FormLoaderStorage.saveForm('harder saved form', [FormInputMock]);
    expect( formSaved).toBeFalsy();
    formSaved = FormLoaderStorage.saveForm('harder saved form', [FormInputMock], true);
    expect(formSaved).toBeTruthy();
    expect(localStorage.getItem('FB_harder_saved_form').length).toBeGreaterThan(0);
  });
});
