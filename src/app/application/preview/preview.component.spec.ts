import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewComponent} from './preview.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Component, Input} from '@angular/core';
import {FormInputInterface} from '../../interfaces/form-input.interface';
import {Observable} from 'rxjs/Observable';
import {FormLoaderService} from '../../services/form-loader.service';
import {GetFormInputModelMock} from '../../shared/mocks/form-input.mock';

@Component({
  selector: 'app-preview-input',
  template: 'test'
}) class PreviewInputMockComponent {
  @Input() formGroup: FormGroup;
  @Input() inputJSON: FormInputInterface;
  @Input() parentValue: any;
  @Input() parentType: string;
}

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;

  const FormLoaderServiceMock = {
    saveForm: jasmine.createSpy('saveForm'),
    getForm: jasmine.createSpy('getForm').and.returnValue(Observable.of([GetFormInputModelMock()]))
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
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
});
