import {FormInputInterface} from './form-input.interface';
import {FormInputModel} from '../models/form-input.model';

export interface SavedFormInterface {
  name: string;
  form: FormInputInterface[];
  formModels?: FormInputModel[];
}
