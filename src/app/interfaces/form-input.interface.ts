import {ConditionInterface} from './condition.interface';

export interface FormInputInterface {
  condition?: ConditionInterface;
  question: string;
  type: string;
  children: FormInputInterface[];
}
