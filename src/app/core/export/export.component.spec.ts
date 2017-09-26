import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportComponent } from './export.component';
import {SavedFormMock} from '../../shared/mocks/saved-form.mock';
import {Observable} from 'rxjs/Observable';
import {FormLoaderService} from '../../services/form-loader.service';

describe('ExportComponent', () => {
  let component: ExportComponent;
  let fixture: ComponentFixture<ExportComponent>;

  const FormLoaderServiceMock = {
    saveForm: jasmine.createSpy('saveForm'),
    getForm: jasmine.createSpy('getForm').and.returnValue(Observable.of(SavedFormMock))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportComponent ],
      providers: [
        {provide: FormLoaderService, useValue: FormLoaderServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
