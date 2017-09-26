import {FormInputModelMock} from './form-input.mock';
import {SavedFormInterface} from '../../interfaces/saved-form.interface';
import {FormInputModel} from '../../models/form-input.model';

const mockFormInputModel = new FormInputModel();
mockFormInputModel.parseJSON(FormInputModelMock);

const SavedFormMock: SavedFormInterface = {
  name: 'test',
  form: [
    FormInputModelMock
  ],
  formModels: [
   mockFormInputModel
  ]
};

export {SavedFormMock};
