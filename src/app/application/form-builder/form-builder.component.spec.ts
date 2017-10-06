import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {FormBuilderComponent} from './form-builder.component';
import {FormArray, FormControl, ReactiveFormsModule} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {FormInputModel} from '../../models/form-input.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FormLoaderService} from '../../services/form-loader.service';
import {GetFormInputModelMock} from '../../shared/mocks/form-input.mock';

@Component({
  selector: 'app-form-builder-input',
  template: ''
})
class FormBuilderInputMockComponent {
  @Input() parentType;
  @Input() inputModel: FormInputModel;
  @Input() formArray: FormArray;
  @Input() nestedId = 0;

}

describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;

  const FormLoaderServiceMock = {
    saveForm: jasmine.createSpy('saveForm'),
    getForm: jasmine.createSpy('getForm').and.returnValue(Observable.of([GetFormInputModelMock()])),
    getActivatedFormName: jasmine.createSpy('getActivatedFormName').and.returnValue('test'),
    updateForm: jasmine.createSpy('updateForm').and.returnValue(true)
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
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
    expect(component.formModel.length).toBe(1);
    expect(FormLoaderServiceMock.getForm).toHaveBeenCalledTimes(1);
  });

  it('should save', () => {
    FormLoaderServiceMock.saveForm.calls.reset();
    component.save();
    expect(FormLoaderServiceMock.saveForm).toHaveBeenCalledTimes(1);
  });

  it('should add new', () => {
    component.addNew();
    expect(component.formModel.length).toBe(2);
  });

  it('should auto save', fakeAsync(() => {
    FormLoaderServiceMock.saveForm.calls.reset();
    const mockControl = new FormControl();
    component.autoSave = true;
    component.ngAfterViewInit();
    component.form.push(mockControl);
    fixture.detectChanges();
    tick(300);
    expect(FormLoaderServiceMock.saveForm).toHaveBeenCalledTimes(2);
  }));

  it('should update form', fakeAsync(() => {
    FormLoaderServiceMock.updateForm.calls.reset();
    component.addNew();
    tick( 300);
    expect(FormLoaderServiceMock.updateForm).toHaveBeenCalledTimes(1);
  }));

});
