import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormInputInterface} from '../../interfaces/form-input.interface';
import {FormLoaderService} from '../../services/form-loader.service';
import {SavedFormInterface} from '../../interfaces/saved-form.interface';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  form = new FormGroup({});

  formJSON: FormInputInterface[];

  constructor(private formLoader: FormLoaderService) {
  }

  ngOnInit() {
    this.formLoader.getForm().subscribe((form: SavedFormInterface) => {
      this.formJSON = form.form;
    });
  }

  onSubmit(event) {
    console.log(event);
  }

}
