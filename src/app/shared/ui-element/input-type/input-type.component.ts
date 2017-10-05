import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input-type',
  templateUrl: './input-type.component.html',
  styleUrls: ['./input-type.component.scss']
})
export class InputTypeComponent {
  @Input() type: string;
  @Input() controlName: string;
  @Input() formGroup: FormGroup;
}
