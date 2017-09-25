import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormBuilderInputComponent} from './form-builder-input.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormInputModel} from '../../../models/form-input.model';
import {FormInputModelMock} from '../../../shared/mocks/form-input.mock';

describe('FormBuilderInputComponent', () => {
  let component: FormBuilderInputComponent;
  let fixture: ComponentFixture<FormBuilderInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [FormBuilderInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderInputComponent);
    component = fixture.componentInstance;
    const model = new FormInputModel();
    model.parseJSON(FormInputModelMock);
    component.inputModel = model;
    component.form = new FormGroup({});
    component.nestedId = 1;
    component.parentType = 'boolean';
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
