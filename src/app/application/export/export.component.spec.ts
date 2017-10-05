import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportComponent } from './export.component';
import {Observable} from 'rxjs/Observable';
import {FormLoaderService} from '../../services/form-loader.service';
import {FormInputMock} from '../../shared/mocks/form-input.mock';

describe('ExportComponent', () => {
  let component: ExportComponent;
  let fixture: ComponentFixture<ExportComponent>;

  const FormLoaderServiceMock = {
    getFormJSON: jasmine.createSpy('getForm').and.returnValue(Observable.of([FormInputMock]))
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
