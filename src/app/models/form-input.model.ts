import {ConditionInterface} from '../interfaces/condition.interface';
import {FormInputInterface} from '../interfaces/form-input.interface';

export class FormInputModel {
  private condition: ConditionInterface;
  private question: string;
  private type: string;
  private children: FormInputModel[] = [];

  constructor(question?: string, type?: string, condition?: ConditionInterface, children?: FormInputModel[]) {
    this.condition = condition;
    this.question = question;
    this.type = type;
    this.children = children || [];
  }

  setCondition(condition: ConditionInterface) {
    this.condition = condition;
  }

  getCondition() {
    return Object.assign({}, this.condition);
  }

  setQuestion(question: string) {
    this.question = question;
  }

  getQuestion() {
    return this.question;
  }

  setType(type: string) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  getChildren() {
    return this.children.slice();
  }

  addChild(child: FormInputModel) {
    this.children.push(child);
  }

  removeChild(id: number): FormInputModel {
    if (id < 0 && id >= this.children.length) {
      return null;
    }
    return this.children.splice(id, 1)[0];
  }

  getJSON(): FormInputInterface {
    const tempChildrenJson = [];
    this.children.forEach((child: FormInputModel) => {
      tempChildrenJson.push(child.getJSON());
    });
    return {
      condition: Object.assign({}, this.condition),
      question: this.question,
      type: this.type,
      children: tempChildrenJson
    };
  }

  parseJSON(json: FormInputInterface) {
    if (json.condition) {
      this.setCondition({
        type: json.condition.type,
        value: json.condition.value
      });
    }
    this.setQuestion(json.question);
    this.setType(json.type);
    this.parseJSONChildren(json.children);
  }

  private parseJSONChildren(children: FormInputInterface[]) {
    this.children = [];
    children.forEach((child: FormInputInterface) => {
      const tempChild: FormInputModel = new FormInputModel();
      tempChild.parseJSON(child);
      this.addChild(tempChild);
    });
  }

}
