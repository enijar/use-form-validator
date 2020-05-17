var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
define(["require", "exports", "react", "./hooks/use-validators"], function (
  require,
  exports,
  react_1,
  use_validators_1
) {
  "use strict";
  exports.__esModule = true;
  function useFormValidator(data, rules, messages) {
    if (messages === void 0) {
      messages = {};
    }
    var _a = react_1.useState(false),
      valid = _a[0],
      setValid = _a[1];
    var _b = react_1.useState({}),
      errors = _b[0],
      setErrors = _b[1];
    var validators = use_validators_1["default"](rules);
    var getValue = react_1.useCallback(function (value, defaultValue) {
      if (defaultValue === void 0) {
        defaultValue = "";
      }
      var type = typeof value;
      if (type === "undefined") {
        return defaultValue;
      }
      if (type === "string") {
        return value.trim();
      }
      return value;
    }, []);
    react_1.useEffect(
      function () {
        var errors = {};
        var valid = true;
        for (var field in validators) {
          if (!validators.hasOwnProperty(field)) {
            continue;
          }
          var value = getValue(data[field]);
          for (
            var i = 0, length_1 = validators[field].length;
            i < length_1;
            i++
          ) {
            var validator = validators[field][i];
            var _a = validator.test.apply(
                validator,
                __spreadArrays([value], validator.args)
              ),
              pass = _a.pass,
              message = _a.message;
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
              errors[field].push(
                use_validators_1.formatMessage(messages[field][validator.name])
              );
            } else if (messages.hasOwnProperty(validator.name)) {
              errors[field].push(
                use_validators_1.formatMessage(messages[validator.name])
              );
            } else {
              errors[field].push(message(field));
            }
          }
        }
        setErrors(errors);
        setValid(valid);
      },
      [validators, data, messages, getValue]
    );
    return {
      valid: valid,
      errors: {
        all: function () {
          var allErrors = [];
          for (var field in errors) {
            if (!errors.hasOwnProperty(field)) {
              continue;
            }
            errors[field].forEach(function (error) {
              return void allErrors.push(error);
            });
          }
          return allErrors;
        },
        get: function (field) {
          return errors[field] || [];
        },
        first: function (field) {
          return (errors[field] || [])[0] || null;
        },
      },
    };
  }
  exports["default"] = useFormValidator;
});
