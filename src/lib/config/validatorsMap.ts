import { Message, Rule, ValidatorsMap } from "./types";
import messagesMap from "./messagesMap";
import { formatMessage } from "../hooks/use-validators";

function getValueType(value: any): string {
  return value.match(/^\d+$/) ? "number" : typeof value;
}

function getLength(value: any): number {
  const type = getValueType(value);
  if (type === "number") {
    return parseFloat(value);
  }
  return value.length;
}

const validatorsMap: ValidatorsMap = {
  required(value: any): Rule {
    const length = getLength(value);
    return {
      pass: length > 0,
      message(field: string): Message {
        return formatMessage(messagesMap.required, { field });
      },
    };
  },
  min(value: any, min: number): Rule {
    const length = getLength(value);
    return {
      pass: length >= min,
      message(field: string): Message {
        return formatMessage(messagesMap.min, { field, min });
      },
    };
  },
  max(value: any, max: number): Rule {
    const length = getLength(value);
    return {
      pass: length <= max,
      message(field: string): Message {
        return formatMessage(messagesMap.max, { field, max });
      },
    };
  },
  between(value: any, min: number, max: number): Rule {
    const length = getLength(value);
    return {
      pass: length >= min && length <= max,
      message(field: string): Message {
        return formatMessage(messagesMap.between, { field, min, max });
      },
    };
  },
  email(value: any): Rule {
    return {
      pass: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
        value
      ),
      message(field: string): Message {
        return formatMessage(messagesMap.email, { field });
      },
    };
  },
  uuid(value:any): Rule {
    return {
      pass: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value
      ),
      message(field: string): Message {
        return formatMessage(messagesMap.uuid, {field})
      }
    }
  },
  required_if(value:any): Rule {
    const args = this.args;
    if(args.length % 2 !== 0) {
      throw new Error(`required_if rule requires a pair of field,value but received instead non-pair params ${args.map((item:any) => item)}.`);
    }
    return {
      pass(params:any, values:any) {
        let valid = true;
        let shouldValidate = false;
        args.forEach((rule:any, index:any) => {
          if(values.hasOwnProperty(rule)) {
            if(values[rule] === args[index + 1]) {
              shouldValidate = true;
            } else {
              shouldValidate = false;
            }
          }
        });
        if(shouldValidate) {
          valid = validatorsMap.required(value).pass;
        }
        return valid;
      },
      message(field: string): Message {
        return formatMessage(messagesMap.required_if, {field});
      }
    }
  },
  required_with(value:any): Rule {
    const args = this.args;
    return {
      pass(params: any, values:any) {
        let valid = true;
        args.forEach((rule:any, index:any) => {
          if(values.hasOwnProperty(rule) && values[rule] !== '') {
            valid = validatorsMap.required(value).pass;
          }
        });
        return valid;
      },
      message(field: string): Message {
        return formatMessage(messagesMap.required_with, {field});
      }
    }
  },
  required_without(value:any): Rule {
    const args = this.args;
    return {
      pass(params: any, values:any) {
        let valid = validatorsMap.required(value).pass;
        args.forEach((rule:any, index:any) => {
          if(values.hasOwnProperty(rule) && values[rule] !== '') {
            valid = true;
          }
        });
        return valid;
      },
      message(field: string): Message {
        return formatMessage(messagesMap.required_without, {field});
      }
    }
  },
  required_unless(value:any): Rule {
    const args = this.args;
    return {
      pass(params: any, values:any) {
        let valid = validatorsMap.required(value).pass;
        let shouldValidate = false;
        args.forEach((rule:any, index:any) => {
          if(values.hasOwnProperty(rule)) {
            if(values[rule] === args[index + 1]) {
              shouldValidate = true;
            } else {
              shouldValidate = false;
            }
          }
        });
        if(shouldValidate) {
          valid = true;
        }
        return valid;
      },
      message(field: string): Message {
        return formatMessage(messagesMap.required_unless, {field});
      }
    }
  },
  required_with_all(value:any): Rule {
    const args = this.args;
    return {
      pass(params:any, values:any) {
        let valid = true;
        let shouldValidate;
        args.forEach((rule:any) => {
          if(values.hasOwnProperty(rule) && values[rule] !== '') {
            shouldValidate = true;
          } else {
            shouldValidate = false;
          }
        });
        if(shouldValidate) {
          valid = validatorsMap.required(value).pass;
        }
        return valid;
      },
      message(field: string): Message {
        return formatMessage(messagesMap.required_with_all, {field});
      }
    }
  },
  required_without_all(value:any): Rule {
    const args = this.args;
    return {
      pass(params:any, values:any) {
        let valid = validatorsMap.required(value).pass;
        let shouldNotValidate;
        args.forEach((rule:any) => {
          if(values.hasOwnProperty(rule) && values[rule] !== '') {
            shouldNotValidate = true;
          } else {
            shouldNotValidate = false;
          }
        });
        if(shouldNotValidate) {
          valid = true;
        }
        return valid;
      },
      message(field: string): Message {
        return formatMessage(messagesMap.required_without_all, {field});
      }
    }
  }
};

export default validatorsMap;
