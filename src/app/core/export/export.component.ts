import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SavedFormInterface} from '../../interfaces/saved-form.interface';
import {FormLoaderService} from '../../services/form-loader.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit, OnDestroy {

  @ViewChild('textArea', {read: ElementRef}) textArea: ElementRef;

  exportJson: string;
  private subscription;

  constructor(private formLoader: FormLoaderService) {
  }

  ngOnInit() {
    console.log('testowe');
    this.subscription = this.formLoader.getForm().subscribe((form: SavedFormInterface) => {
      console.log(form);
      this.exportJson = JSON.stringify(form.form);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
