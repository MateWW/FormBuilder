import {FormInputModel} from './form-input.model';
import {FormInputModelMock} from '../shared/mocks/form-input.mock';

describe('FormInputModel', () => {
  it('should get copy of condition', () => {
    const model = new FormInputModel('Hello', 'string', {type: 'equal', value: 'test'});

    expect((<any>model).condition === model.getCondition()).toBeFalsy();
  });

  it('should get copy of children array', () => {
    const model = new FormInputModel();

    expect((<any>model).children === model.getChildren()).toBeFalsy();
  });

  it('should remove child', () => {
    const model = new FormInputModel('Hello', 'string', {type: 'equal', value: 'test'});
    model.addChild(new FormInputModel());
    expect(model.getChildren().length).toBe(1);
    model.removeChild(0);
    expect(model.getChildren().length).toBe(0);
  });

  it('should return json', () => {
    const model = new FormInputModel('Hello', 'string', {
        type: 'equal',
        value: 'test'
      }, [new FormInputModel('Hello 2')]),
      parserJSON = model.getJSON();

    expect(parserJSON.question).toBe('Hello');
    expect(parserJSON.children[0].question).toBe('Hello 2');
  });

  it('should parse JSON', () => {
    const model = new FormInputModel();
    model.parseJSON(FormInputModelMock);
    expect(model.getQuestion()).toBe(FormInputModelMock.question);
    expect(model.getType()).toBe(FormInputModelMock.type);
    expect(model.getChildren().length).toBe(FormInputModelMock.children.length);
    expect(model.getChildren()[0].getCondition().value).toBe(FormInputModelMock.children[0].condition.value);
    expect(model.getChildren()[0].getCondition().type).toBe(FormInputModelMock.children[0].condition.type);
    expect(model.getChildren()[0].getType()).toBe(FormInputModelMock.children[0].type);
    expect(model.getChildren()[0].getQuestion()).toBe(FormInputModelMock.children[0].question);
  });

  it('should destroy element', () => {
    const model = new FormInputModel();
    model.parseJSON(FormInputModelMock);
    model.destroy();
    model.setType('test');
    expect(model.getType()).toBeNull();
    expect(model.isDestroyed()).toBeTruthy();
    expect((<any>model).type).toBe(FormInputModelMock.type);
  });
});
