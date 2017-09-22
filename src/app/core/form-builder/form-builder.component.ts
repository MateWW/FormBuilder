import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/debounce';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements AfterViewInit {
  @ViewChild('form', {read: NgForm}) ngForm;

  constructor() {
  }

  ngAfterViewInit() {
    this.ngForm.valueChanges.debounce(300).subscribe((value) => {
      console.log(value);
    });
  }

}
