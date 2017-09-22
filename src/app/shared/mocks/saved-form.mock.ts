import {FormInputModelMock} from './form-input.mock';
import {SavedFormInterface} from '../../interfaces/saved-form.interface';

const SavedFormMock: SavedFormInterface = {
  name: 'test',
  form: [
    FormInputModelMock
  ]
};

export {SavedFormMock};
