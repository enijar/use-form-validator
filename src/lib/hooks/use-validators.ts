import { useEffect, useState } from "react";
import {
  Args,
  Message,
  MessagesMap,
  Rule,
  Rules,
  Validators,
  ValidatorsMap,
} from "../config/types";
import { ARG_SEP, MULTI_ARG_SEP, RULE_SEP } from "../config/consts";

const messagesMap: MessagesMap = {
  required: "The :field field is required",
  min: "The :field field must have a min of :length characters",
  max: "The :field field must have a max of :length characters",
  email: "The :field field is not a valid email",
};

const validatorsMap: ValidatorsMap = {
  required(value: any): Rule {
    return {
      pass: value.length > 0,
      message(field: string): Message {
        return formatMessage(messagesMap.required, { field });
      },
    };
  },
  min(value: any, length: number): Rule {
    return {
      pass: value.length >= length,
      message(field: string): Message {
        return formatMessage(messagesMap.min, { field, length });
      },
    };
  },
  max(value: any, length: number): Rule {
    return {
      pass: value.length <= length,
      message(field: string): Message {
        return formatMessage(messagesMap.max, { field, length });
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
};

export function formatMessage(message: Message, args: Args = {}): Message {
  let formattedMessage = message;
  for (const arg in args) {
    if (!args.hasOwnProperty(arg)) {
      continue;
    }
    formattedMessage = formattedMessage.replace(`:${arg}`, args[arg]);
  }
  return formattedMessage;
}

export default function useValidators(rules: Rules): Validators {
  const [validators, setValidators] = useState<Validators>({});

  useEffect(() => {
    setValidators(() => {
      const validators: Validators = {};
      for (const field in rules) {
        if (!rules.hasOwnProperty(field)) {
          continue;
        }
        validators[field] = rules[field].split(RULE_SEP).map((ruleString) => {
          let [name, args = ""] = ruleString.split(ARG_SEP);
          const test = validatorsMap[name];
          return {
            name,
            args: args.length === 0 ? [] : args.split(MULTI_ARG_SEP),
            test,
          };
        });
      }
      return validators;
    });
  }, [rules]);

  return validators;
}
