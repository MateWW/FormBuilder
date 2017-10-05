import {Component, OnInit} from '@angular/core';
import {FormArray} from '@angular/forms';
import {FormLoaderService} from '../../services/form-loader.service';
import {FormInputInterface} from '../../interfaces/form-input.interface';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  form = new FormArray([]);

  formJSON: FormInputInterface[];

  constructor(private formLoader: FormLoaderService) {
  }

  ngOnInit() {
    this.formLoader.getFormJSON().subscribe((form: FormInputInterface[]) => {
      this.formJSON = form;
    });
  }

  onSubmit(event) {
    console.log(event);
  }

}
