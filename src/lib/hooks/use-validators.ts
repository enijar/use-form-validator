import { useEffect, useState } from "react";
import { Args, Message, Rules, Validators } from "../config/types";
import { ARG_SEP, MULTI_ARG_SEP, RULE_SEP } from "../config/consts";
import validatorsMap from "../config/validatorsMap";

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
