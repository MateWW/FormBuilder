import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormBuilderComponent} from './form-builder.component';
import {FormGroup, FormsModule} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {FormInputModel} from '../../models/form-input.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FormLoaderService} from '../../services/form-loader.service';

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
    getForm: jasmine.createSpy('getForm').and.returnValue(Observable.of())
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

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
