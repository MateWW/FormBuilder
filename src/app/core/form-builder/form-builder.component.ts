import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  @ViewChild('form', {read: NgForm}) ngForm;

  constructor() {
  }

  ngOnInit() {
    console.log(this.ngForm);
  }

}
