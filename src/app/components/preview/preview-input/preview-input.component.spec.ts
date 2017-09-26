import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewInputComponent } from './preview-input.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormInputModelMock} from '../../../shared/mocks/form-input.mock';

describe('PreviewInputComponent', () => {
  let component: PreviewInputComponent;
  let fixture: ComponentFixture<PreviewInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ PreviewInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewInputComponent);
    component = fixture.componentInstance;
    component.inputJSON = FormInputModelMock;
    component.parentValue = '1';
    component.formGroup = new FormGroup({});
    component.parentType = 'boolean';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
