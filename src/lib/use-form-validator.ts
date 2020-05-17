import { useCallback, useEffect, useState } from "react";
import { Data, Errors, Messages, Rules } from "./types";
import useValidators, { formatMessage } from "./hooks/use-validators";

export default function useFormValidator(
  data: Data,
  rules: Rules,
  messages: Messages = {}
) {
  const [valid, setValid] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const validators = useValidators(rules);

  const getValue = useCallback((value: any, defaultValue: string = ""): any => {
    const type = typeof value;
    if (type === "undefined") {
      return defaultValue;
    }
    if (type === "string") {
      return value.trim();
    }
    return value;
  }, []);

  useEffect(() => {
    const errors = {};
    let valid = true;
    for (const field in validators) {
      if (!validators.hasOwnProperty(field)) {
        continue;
      }
      const value = getValue(data[field]);
      for (let i = 0, length = validators[field].length; i < length; i++) {
        const validator = validators[field][i];
        const { pass, message } = validator.test(value, ...validator.args);
        if (pass) {
          continue;
        }
        valid = false;
        if (!errors.hasOwnProperty(field)) {
          errors[field] = [];
        }
        if (
          messages.hasOwnProperty(field) &&
          messages[field].hasOwnProperty(validator.name)
        ) {
          errors[field].push(formatMessage(messages[field][validator.name]));
        } else if (messages.hasOwnProperty(validator.name)) {
          errors[field].push(formatMessage(messages[validator.name]));
        } else {
          errors[field].push(message(field));
        }
      }
    }
    setErrors(errors);
    setValid(valid);
  }, [validators, data, messages, getValue]);

  return {
    valid,
    errors: {
      all() {
        const allErrors = [];
        for (const field in errors) {
          if (!errors.hasOwnProperty(field)) {
            continue;
          }
          errors[field].forEach((error) => void allErrors.push(error));
        }
        return allErrors;
      },
      get(field) {
        return errors[field] || [];
      },
      first(field) {
        return (errors[field] || [])[0] || null;
      },
    },
  };
}
