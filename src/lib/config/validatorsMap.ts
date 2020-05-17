import { Message, Rule, ValidatorsMap } from "./types";
import messagesMap from "./messagesMap";
import { formatMessage } from "../hooks/use-validators";

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

export default validatorsMap;
