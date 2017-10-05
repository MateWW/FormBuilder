export interface ConditionsModelInterface {
  [type: string]: ConditionFunctions;
}

export interface ConditionFunctions {
  [conditionType: string]: {
    name: string;
    func: (factor: any, value: any) => boolean;
  };
}
