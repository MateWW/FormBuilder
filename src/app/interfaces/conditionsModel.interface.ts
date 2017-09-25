export interface ConditionsModelInterface {
  [type: string]: {
    [conditionType: string]: {
      name: string;
      func: (factor: any, value: any) => boolean;
    }
  };
}
