import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportComponent } from './export.component';
import {Observable} from 'rxjs/Observable';
import {FormLoaderService} from '../../services/form-loader.service';
import {FormInputMock} from '../../shared/mocks/form-input.mock';
import {By} from '@angular/platform-browser';

describe('ExportComponent', () => {
  let component: ExportComponent;
  let fixture: ComponentFixture<ExportComponent>;

  const FormLoaderServiceMock = {
    getFormJSON: jasmine.createSpy('getFormJSON').and.returnValue(Observable.of([FormInputMock]))
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

  it('should load json to textarea', () => {
    const text = fixture.debugElement.query(By.css('textarea')).nativeElement.value;
    expect(text).toBe(JSON.stringify([FormInputMock]));
  });
});
