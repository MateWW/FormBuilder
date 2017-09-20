import {FormInputInterface} from '../../interfaces/form-input.interface';

const FormInputModelMock: FormInputInterface = {
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

export { FormInputModelMock };
