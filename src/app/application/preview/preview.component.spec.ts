import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewComponent} from './preview.component';
import {FormArray, ReactiveFormsModule} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {FormInputInterface} from '../../interfaces/form-input.interface';
import {Observable} from 'rxjs/Observable';
import {FormLoaderService} from '../../services/form-loader.service';
import {FormInputMock} from '../../shared/mocks/form-input.mock';

@Component({
  selector: 'app-preview-input',
  template: 'test'
}) class PreviewInputMockComponent {
  @Input() formGroup: FormArray;
  @Input() inputJSON: FormInputInterface;
  @Input() parentValue: any;
  @Input() parentType: string;
}

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;

  const FormLoaderServiceMock = {
    saveForm: jasmine.createSpy('saveForm'),
    getFormJSON: jasmine.createSpy('getFormJSON').and.returnValue(Observable.of([FormInputMock]))
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [PreviewComponent, PreviewInputMockComponent],
      providers: [
        {provide: FormLoaderService, useValue: FormLoaderServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load form', () => {
    expect(FormLoaderServiceMock.getFormJSON).toHaveBeenCalled();
    expect(JSON.stringify(component.formJSON)).toBe(JSON.stringify([FormInputMock]));
  });
});
