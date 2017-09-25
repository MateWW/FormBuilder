import {ConditionInterface} from '../interfaces/condition.interface';
import {FormInputInterface} from '../interfaces/form-input.interface';

export class FormInputModel {
  private condition: ConditionInterface;
  private question: string;
  private type = 'text';
  private children: FormInputModel[] = [];
  private destroyed = false;

  constructor(question?: string, type?: string, condition?: ConditionInterface, children?: FormInputModel[]) {
    this.condition = condition;
    this.question = question;
    this.type = type;
    this.children = children || [];
  }

  setCondition(condition: ConditionInterface) {
    if (this.destroyed) {
      return null;
    }
    this.condition = condition;
  }

  getCondition() {
    if (this.destroyed) {
      return null;
    }
    return Object.assign({}, this.condition);
  }

  setQuestion(question: string) {
    if (this.destroyed) {
      return;
    }
    this.question = question;
  }

  getQuestion() {
    if (this.destroyed) {
      return null;
    }
    return this.question;
  }

  setType(type: string) {
    if (this.destroyed) {
      return;
    }
    this.type = type;
  }

  getType() {
    if (this.destroyed) {
      return null;
    }
    return this.type;
  }

  getChildren() {
    if (this.destroyed) {
      return null;
    }
    return this.children.slice();
  }

  destroy() {
    this.destroyed = true;
  }

  isDestroyed() {
    return this.destroyed;
  }

  addChild(child: FormInputModel) {
    if (this.destroyed) {
      return;
    }
    this.children.push(child);
  }

  removeChild(id: number): FormInputModel {
    if (id < 0 && id >= this.children.length) {
      return null;
    }
    return this.children.splice(id, 1)[0];
  }

  getJSON(): FormInputInterface {
    if (this.destroyed) {
      return null;
    }
    const tempChildrenJson = [];
    this.children.forEach((child: FormInputModel, index: number) => {
      if (child.isDestroyed()) {
        this.removeChild(index);
        return;
      }
      tempChildrenJson.push(child.getJSON());
    });
    return {
      condition: this.condition ? Object.assign({}, this.condition) : null,
      question: this.question,
      type: this.type,
      children: tempChildrenJson
    };
  }

  parseJSON(json: FormInputInterface) {
    if (this.destroyed || !json) {
      return;
    }
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
