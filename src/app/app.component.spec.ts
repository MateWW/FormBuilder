import {TestBed, async, fakeAsync} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {FormLoaderService} from './services/form-loader.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FormsListMock} from './shared/mocks/forms-list.mock';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {

  const formLoaderMock = {
    createForm: jasmine.createSpy('createForm'),
    loadForm: jasmine.createSpy('loadForm'),
    getActivatedFormName: jasmine.createSpy('loadForm').and.returnValue('test2'),
    getFormList: jasmine.createSpy('getFormList').and.returnValue(Observable.of(FormsListMock))
  };

  let fixture,
    app;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: FormLoaderService, useValue: formLoaderMock}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });


  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should load form list', fakeAsync(() => {
    expect(formLoaderMock.getFormList).toHaveBeenCalled();

    expect(formLoaderMock.getActivatedFormName).toHaveBeenCalled();
    expect(fixture.debugElement.queryAll(By.css('option')).length).toBe(FormsListMock.length + 1);
  }));

  it('should create form which not exist', () => {
    formLoaderMock.createForm.and.returnValue(true);
    app.create({preventDefault: () => (false)}, {valid: true, value: {formName: 'test'}});
    expect(formLoaderMock.createForm).toHaveBeenCalledTimes(1);
    expect(formLoaderMock.createForm).toHaveBeenCalledWith('test');
  });

  it('should create form which not exist', () => {
    formLoaderMock.createForm.calls.reset();
    formLoaderMock.createForm.and.returnValue(false);
    window.confirm = () => true;
    app.create({preventDefault: () => (false)}, {valid: true, value: {formName: 'test'}});
    expect(formLoaderMock.createForm).toHaveBeenCalledTimes(2);
    expect(formLoaderMock.createForm).toHaveBeenCalledWith('test', true);
  });

  it('should select form from list', () => {
    app.onFormChange('test');
    expect(formLoaderMock.loadForm).toHaveBeenCalledWith('test');
  });

});
