import {ConditionsModelInterface} from '../interfaces/conditionsModel.interface';

function equalsFn(factor: any, value: any) {
  return factor === value;
}

function greaterThenFn(factory: number, value: number) {
  return value > factory;
}

function lessThenFn(factory: number, value: number) {
  return value < factory;
}


const ConditionsModel: ConditionsModelInterface = {
  text: {
    equals: {
      func: equalsFn,
      name: 'Equals'
    }
  },
  number: {
    equals: {
      func: equalsFn,
      name: 'Equals'
    },
    greaterThen: {
      func: greaterThenFn,
      name: 'Greater then'
    },
    lessThen: {
      func: lessThenFn,
      name: 'Less then'
    }
  },
  boolean: {
    equals: {
      func: equalsFn,
      name: 'Equals'
    }
  }
};

export {ConditionsModel};
