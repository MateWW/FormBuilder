import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {FormBuilderComponent} from './form-builder.component';
import {FormGroup, FormsModule} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {FormInputModel} from '../../models/form-input.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FormLoaderService} from '../../services/form-loader.service';
import {SavedFormMock} from '../../shared/mocks/saved-form.mock';

@Component({
  selector: 'app-form-builder-input',
  template: ''
})
class FormBuilderInputMockComponent {
  @Input() parentType;
  @Input() inputModel: FormInputModel;
  @Input() form: FormGroup;
  @Input() nestedId = 0;
}

describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;

  const FormLoaderServiceMock = {
    saveForm: jasmine.createSpy('saveForm'),
    getForm: jasmine.createSpy('getForm').and.returnValue(Observable.of(SavedFormMock))
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [FormBuilderComponent, FormBuilderInputMockComponent],
      providers: [
        {provide: FormLoaderService, useValue: FormLoaderServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get form', () => {
    expect(component.formModel).toBe(SavedFormMock);
    expect(FormLoaderServiceMock.getForm).toHaveBeenCalledTimes(1);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should save', () => {
    FormLoaderServiceMock.saveForm.calls.reset();
    component.save();
    expect(FormLoaderServiceMock.saveForm).toHaveBeenCalledTimes(1);
  });

  it('should add new', () => {
    component.addNew();
    expect(component.formModel.formModels.length).toBe(2);
  });

  it('should auto save', fakeAsync(() => {
    FormLoaderServiceMock.saveForm.calls.reset();
    component.ngAfterViewInit();
    component.autoSave = true;
    component.ngForm.valueChanges.emit('test');
    tick(300);
    expect(FormLoaderServiceMock.saveForm).toHaveBeenCalledTimes(2);
  }));

  it('should submit', fakeAsync(() => {
    component.ngAfterViewInit();
    FormLoaderServiceMock.saveForm.calls.reset();
    component.autoSave = true;
    component.ngForm.ngSubmit.emit('test');
    tick(300);
    expect(FormLoaderServiceMock.saveForm).toHaveBeenCalledTimes(2);
  }));

});
