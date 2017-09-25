import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/observable/timer';
import {FormLoaderService} from '../../services/form-loader.service';
import {Observable} from 'rxjs/Observable';
import {SavedFormInterface} from '../../interfaces/saved-form.interface';
import {FormInputModel} from '../../models/form-input.model';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, AfterViewInit {
  @ViewChild('form', {read: NgForm}) ngForm;

  formModel: SavedFormInterface;

  autoSave = false;

  constructor(private formLoader: FormLoaderService) {

  }

  ngOnInit() {
    this.formLoader.getForm().subscribe((formModel) => {
      this.formModel = formModel;
    });
  }

  ngAfterViewInit() {
    this.ngForm.valueChanges.debounce(() => Observable.timer(300)).subscribe(() => {
      if (this.autoSave) {
        this.formLoader.saveForm();
      }
    });
    this.ngForm.ngSubmit.subscribe(() => {
      this.formLoader.saveForm();
    });
  }

  addNew() {
    if (this.formModel) {
      this.formModel.formModels.push(new FormInputModel());
      this.save();
    }
  }

  save() {
    this.formLoader.saveForm();
  }
}
