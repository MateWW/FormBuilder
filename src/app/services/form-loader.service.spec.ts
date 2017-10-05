import {TestBed, inject, fakeAsync, tick} from '@angular/core/testing';
import {FormLoaderService} from './form-loader.service';
import {FormInputModel} from '../models/form-input.model';

import {FormInputMock} from '../shared/mocks/form-input.mock';
import {FormInputInterface} from '../interfaces/form-input.interface';

describe('FormLoaderService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormLoaderService]
    });
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('should get form list', inject([FormLoaderService], (service: FormLoaderService) => {
    localStorage.setItem('FB_test', JSON.stringify([FormInputMock]));
    localStorage.setItem('FB_second_correct', JSON.stringify([FormInputMock]));
    service.getFormList().subscribe((list: string[]) => {
      expect(list.length).toBe(2);
    });

  }));

  it('should try to load and return form without loaded form', fakeAsync(inject([FormLoaderService], (service: FormLoaderService) => {
    expect(service.getActivatedFormName()).toBeNull();
    service.getForm().subscribe((form: FormInputModel[]) => {
      expect(form instanceof Array).toBe(true);
      expect(form.length).toBe(0);
    });
    service.getFormJSON().subscribe((form: FormInputInterface[]) => {
      expect(form instanceof Array).toBe(true);
      expect(form.length).toBe(0);
    });
    tick();
  })));

  it('should load and return active form name', inject([FormLoaderService], (service: FormLoaderService) => {
    localStorage.setItem('FB_test_name', JSON.stringify([FormInputMock]));
    service.loadForm('test name');
    expect(service.getActivatedFormName()).toBe('test name');
  }));

  it('should load and return form', fakeAsync(inject([FormLoaderService], (service: FormLoaderService) => {
    localStorage.setItem('FB_test_name', JSON.stringify([FormInputMock, FormInputMock]));
    service.loadForm('test name');
    service.getForm().subscribe((form: FormInputModel[]) => {
      expect(form instanceof Array).toBe(true);
      expect(form.length).toBe(2);
    });
    service.getFormJSON().subscribe((form: FormInputInterface[]) => {
      expect(form instanceof Array).toBe(true);
      expect(form.length).toBe(2);
    });
    tick();
  })));

  it('should create form', fakeAsync(inject([FormLoaderService], (service: FormLoaderService) => {
    expect(service.createForm('test')).toBeTruthy();
    service.getForm().subscribe((form: FormInputModel[]) => {
      expect(form.length).toBe(0);
      expect(localStorage.getItem('FB_test')).toBe('[]');
    });
    tick();
  })));

  it('should try overwrite existing form', fakeAsync(inject([FormLoaderService], (service: FormLoaderService) => {
    localStorage.setItem('FB_test', JSON.stringify([FormInputMock]));
    expect(service.loadForm('test')).toBeTruthy();
    expect(service.createForm('test')).toBeFalsy();
    service.getForm().subscribe((form: FormInputModel[]) => {
      expect(form.length).toBe(1);
      expect(JSON.parse(localStorage.getItem('FB_test')).length).toBe(1);
    });
    tick();
  })));

  it('should constrain overwrite existing form', fakeAsync(inject([FormLoaderService], (service: FormLoaderService) => {
    localStorage.setItem('FB_test', JSON.stringify([FormInputMock]));
    expect(service.createForm('test', true)).toBeTruthy();
    service.getForm().subscribe((form: FormInputModel[]) => {
      expect(form.length).toBe(0);
      expect(localStorage.getItem('FB_test')).toBeDefined();
    });
    tick();
  })));

  it('should save datas', inject([FormLoaderService], (service: FormLoaderService) => {
    expect(service.createForm('test')).toBeTruthy();
    const formModel = new FormInputModel('test', 'text');
    service.getForm().subscribe((form: FormInputModel[]) => {
      form.push(formModel);
    });
    expect(JSON.parse(localStorage.getItem('FB_test')).length).toBe(0);
    expect(service.saveForm()).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('FB_test')).length).toBe(1);
  }));


});
