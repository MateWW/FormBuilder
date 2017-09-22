import {TestBed, inject, fakeAsync, tick} from '@angular/core/testing';

import {FormLoaderService} from './form-loader.service';
import {FormInputModel} from '../models/form-input.model';
import {SavedFormMock} from '../shared/mocks/saved-form.mock';

fdescribe('FormLoaderService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormLoaderService]
    });
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('should be created', inject([FormLoaderService], (service: FormLoaderService) => {
    expect(service).toBeTruthy();
  }));

  it('should load and get test form', fakeAsync(inject([FormLoaderService], (service: FormLoaderService) => {
    localStorage.setItem('FB_test', JSON.stringify(SavedFormMock));
    service.loadForm('FB_test');
    service.getForm().subscribe((form: FormInputModel[]) => {
      expect(form.length).toBe(1);
      expect(form[0].getType()).toBe('boolean');
      expect(form[0].getChildren().length).toBe(2);
    });
    tick();
  })));

  it('should try load not existing test form', inject([FormLoaderService], (service: FormLoaderService) => {
    expect(service.loadForm('FB_test')).toBeFalsy();
  }));


  it('should return list of forms', inject([FormLoaderService], (service: FormLoaderService) => {
    localStorage.setItem('FB_test1', JSON.stringify(SavedFormMock));
    localStorage.setItem('testowo', JSON.stringify(SavedFormMock));
    localStorage.setItem('FB_test2', JSON.stringify({name: 'testowo'}));
    localStorage.setItem('FB_test', JSON.stringify(SavedFormMock));
    service.getFormList().subscribe((list: string[]) => {
      expect(list.length).toBe(1);
      expect(list[0]).toBe('test');
    });
    expect(service).toBeTruthy();
  }));

  it('should create form', fakeAsync(inject([FormLoaderService], (service: FormLoaderService) => {
    expect(service.createForm('test')).toBeTruthy();
    service.getForm().subscribe((form: FormInputModel[]) => {
      expect(form.length).toBe(0);
      expect(localStorage.getItem('FB_test')).toBeDefined();
    });
    tick();
  })));

  it('should try overwrite existing form', fakeAsync(inject([FormLoaderService], (service: FormLoaderService) => {
    localStorage.setItem('FB_test', JSON.stringify(SavedFormMock));
    expect(service.createForm('test')).toBeFalsy();
    service.getForm().subscribe((form: FormInputModel[]) => {
      expect(form.length).toBe(1);
      expect(localStorage.getItem('FB_test')).toBeDefined();
    });
    tick();
  })));

  it('should constrain overwrite existing form', fakeAsync(inject([FormLoaderService], (service: FormLoaderService) => {
    localStorage.setItem('FB_test', JSON.stringify(SavedFormMock));
    expect(service.createForm('test', true)).toBeTruthy();
    service.getForm().subscribe((form: FormInputModel[]) => {
      expect(form.length).toBe(0);
      expect(localStorage.getItem('FB_test')).toBeDefined();
    });
    tick();
  })));

  it('should save datas', inject([FormLoaderService], (service: FormLoaderService) => {
    expect(service.createForm('test')).toBeTruthy();
    const formModel = new FormInputModel('test', 'text'),
      stream = service.getForm().subscribe((form: FormInputModel[]) => {
        expect(form.length).toBe(0);
        form.push(formModel);
      });
    stream.unsubscribe();
    service.saveForm();
    service.getForm().subscribe((form: FormInputModel[]) => {
      expect(form.length).toBe(1);
      expect(localStorage.getItem('FB_test') === JSON.stringify({
        name: 'test',
        form: [
          formModel.getJSON()
        ]
      })).toBeTruthy();
    });
  }));

});
