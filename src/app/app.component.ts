import {Component, HostBinding, OnInit} from '@angular/core';
import {FormLoaderService} from './services/form-loader.service';
import {Observable} from 'rxjs/Observable';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostBinding('class.createFormBoxVisible') createFormVisible = false;

  formListStream: Observable<string[]>;
  formFailedToCreate = false;


  constructor(private formLoader: FormLoaderService) {
  }

  ngOnInit() {
    this.formListStream = this.formLoader.getFormList();
  }

  onFormChange(value) {
    this.formLoader.loadForm(value);
  }

  create(event, form: NgForm) {
    event.preventDefault();
    if (form.valid && this.formLoader.createForm(form.value.formName)) {
      this.createFormVisible = false;
    } else if (!form.valid) {
      return;
    } else {
      const condition = confirm('Form with this name already exist. Do you want to overwrite it.');
      if (condition && this.formLoader.createForm(form.value.formName, true)) {
        this.createFormVisible = false;
      } else if (condition) {
        this.formFailedToCreate = true;
      }
    }
  }

  getActiveForm() {
    return this.formLoader.getActivatedFormName() || '';
  }

  openCreateFromBox() {
    this.createFormVisible = true;
  }

  hideCreateFormBox() {
    this.createFormVisible = false;
  }
}
