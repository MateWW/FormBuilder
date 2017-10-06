import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PreviewInputComponent} from './preview-input.component';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FormInputMock} from '../../../shared/mocks/form-input.mock';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-input-type',
  template: 'test'
})
class InputTypeMockComponent {
  @Input() type: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
}


describe('PreviewInputComponent', () => {
  let component: PreviewInputComponent;
  let fixture: ComponentFixture<PreviewInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        PreviewInputComponent,
        InputTypeMockComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewInputComponent);
    component = fixture.componentInstance;
    component.inputJSON = FormInputMock.children[0];
    component.parentValue = false;
    component.formGroup = new FormArray([]);
    component.parentType = FormInputMock.type;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should push local group', () => {
    expect(component.formGroup.controls.length).toBe(1);
  });

  it('should be visible', () => {
    expect(component.visible).toBeFalsy();
    component.parentValue = true;
    component.ngOnChanges();
    expect(component.visible).toBeTruthy();
  });
});
