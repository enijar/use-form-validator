export type Rules = {
  [key: string]: string;
};

export type Messages = {
  [key: string]: { [key: string]: string } | string;
};

export type Validators = {
  [key: string]: Validator[];
};

export type Args = {
  [key: string]: any;
};

export type Errors = {
  [key: string]: FieldErrors;
};

export type ValidatorsMap = {
  [key: string]: Function;
};

export type MessagesMap = {
  [key: string]: string;
};

export type Validator = {
  name: string;
  args: string[];
  test: Function;
};

export type FieldErrors = string[];

export type Data = {
  [key: string]: any;
};

export type Rule = {
  [key: string]: any;
};

export type Message = string;
