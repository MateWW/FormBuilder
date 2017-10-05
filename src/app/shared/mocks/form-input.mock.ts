import {FormInputInterface} from '../../interfaces/form-input.interface';
import {FormInputModel} from '../../models/form-input.model';

const FormInputMock: FormInputInterface = {
  type: 'boolean',
  question: 'Are you there',
  children: [
    {
      condition: {
        type: 'equals',
        value: 'true'
      },
      type: 'text',
      question: 'Whats your name?',
      children: []
    },
    {
      condition: {
        type: 'equals',
        value: 'false'
      },
      type: 'text',
      question: 'Okey?',
      children: []
    }
  ]
};

function GetFormInputModelMock() {
  const model = new FormInputModel();
  model.parseJSON(FormInputMock);
  return model;
}

export { FormInputMock, GetFormInputModelMock };
