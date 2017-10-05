import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormLoaderService} from '../../services/form-loader.service';
import {FormInputInterface} from '../../interfaces/form-input.interface';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit, OnDestroy {

  exportJson: string;
  private subscription;

  constructor(private formLoader: FormLoaderService) {
  }

  ngOnInit() {
    this.subscription = this.formLoader.getFormJSON().subscribe((form: FormInputInterface[]) => {
      this.exportJson = JSON.stringify(form);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
